import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from "@angular/common";

/** Servicios */
import { UserService } from '../../../../core/shared/services/user.service';

/** Interfaces */
import { User } from 'src/app/core/interfaces/user.interface';
import { Project } from '../../../../core/interfaces/project.interface';
import { CrudProjectService } from '../../../services/crud-project.service';


@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.scss']
})
export class AddProyectoComponent implements OnInit {

  public msgPostProject!: any;
  public managers!: User[];
  public submitted: boolean = false;

  constructor(public location: Location, private userService: UserService, private crudProjectService: CrudProjectService) { }

  ngOnInit(): void {
    this.userService.getByRol("Manager").subscribe({
      next: res => {
        this.managers = res.users;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  createProject(form: NgForm) {
    this.submitted = true;


    if (form.valid) {
      const newProject: Project =  {
        nombre: form.value.nombreP,
        cliente: form.value.nombreC,
        manager: form.value.manager,
        version: form.value.version
      }

      console.log(newProject);

      this.crudProjectService.createProject(newProject)
      .subscribe({
        next: res => {
          console.log(res);
          this.msgPostProject = {
            status: 'correct',
            message: `${res.status} con id ${res.newProject._id}`
          }
        },
        error: err => {
          console.log(err);
          this.msgPostProject = {
            status: 'error',
            message: err
          }
        }
      })
    }
  }
}
