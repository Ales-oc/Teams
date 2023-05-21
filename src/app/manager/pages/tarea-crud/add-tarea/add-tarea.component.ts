import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

/** Modelos */
import { User } from 'src/app/core/interfaces/user.interface';

/** Servicios */
import { UserService } from 'src/app/core/shared/services/user.service';
import { CrudTareaService } from '../../../services/crud-tarea.service';

@Component({
  selector: 'app-add-tarea',
  templateUrl: './add-tarea.component.html',
  styleUrls: ['./add-tarea.component.scss']
})
export class AddTareaComponent implements OnInit {

  public msgPostTask!: any;
  public progs: User[] = []
  public submitted: boolean = false;
  private idProject: String = "";

  constructor(public location: Location, router: Router, private userService: UserService, private crudTareaService: CrudTareaService) {
    this.idProject= router.url.split("/")[3];
  }

  ngOnInit(): void {
    this.getProgrammers();
  }

  createTask(form: NgForm) {
    this.submitted = true;
    if(form.valid) {
      this.crudTareaService.createTask(form.value.nombreT, this.idProject, form.value.programmers, form.value.fechaEntrega)
      .subscribe({
        next: res => {
          this.msgPostTask = {
            status: 'correct',
            message: `${res.status} con id ${res.newTask._id}`
          }
        },
        error: err => {
          console.log(err);
          this.msgPostTask = {
            status: 'error',
            message: err
          }
        }
      })
    }
  }

  getProgrammers() {
    this.userService.getByRol('Programador').
    subscribe({
      next: res => {
        console.log(res);
        this.progs = res.users
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
