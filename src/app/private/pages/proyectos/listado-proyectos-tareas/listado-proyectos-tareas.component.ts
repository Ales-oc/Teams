import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

/** Modelos */
import { Project } from 'src/app/core/interfaces/project.interface';
import { User } from 'src/app/core/interfaces/user.interface';

/** Servicios */
import { ProjectService } from '../../../../core/shared/services/project.service';
import { UserService } from 'src/app/core/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-proyectos-tareas',
  templateUrl: './listado-proyectos-tareas.component.html',
  styleUrls: ['./listado-proyectos-tareas.component.scss']
})
export class ListadoProyectosTareasComponent implements OnInit {

  public managers: User[] = [];
  public projects: Project[] = [];
  public clientes: String[] = [];
  public p: number = 1;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
    this.getManagers();
  }

  onSubmit(form: NgForm){
    this.projectService.getByFilter(form.value.nameP, form.value.manager, form.value.client)
    .subscribe({
      next: res => {
        console.log(res);
        this.projects = res.projects;
      }
    })
  }

  getProjects() {
    this.projectService.getProjects()
    .subscribe({
      next: res => {
        this.projects = res.projects
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
        this.getClientes();
      }
    })
  }

  getManagers() {
    this.userService.getByRol('Manager')
    .subscribe({
      next: res => {
        this.managers = res.users
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getClientes() {
    console.log(this.projects);
    this.projects.forEach(project => {
      if (!this.clientes.includes(project.cliente)) {
        this.clientes.push(project.cliente);
      }
    });
  }

  getManagerById(id: string) {
    let managerFound = {
      nombre: "Manager desconocido"
    };
    this.managers.forEach(manager => {
      if (manager._id === id) managerFound = manager;
    });
    return managerFound;
  }
}
