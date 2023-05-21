import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

/** Modelos */
import { User } from 'src/app/core/interfaces/user.interface';
import { Tarea } from '../../../../core/interfaces/tarea.interface';

/** Servicios */
import { UserService } from 'src/app/core/shared/services/user.service';
import { TareaService } from '../../../../core/shared/services/tarea.service';
import { Project } from 'src/app/core/interfaces/project.interface';
import { ProjectService } from '../../../../core/shared/services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-tareas',
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.scss']
})
export class ListadoTareasComponent implements OnInit {

  public $userData: Observable<any> = this.userService.getCurrentUser();
  public workingOnProject: boolean = false;
  public isManager: boolean = false;
  public p: number = 1;
  private currentUser!: User;
  public currentProject!: Project;
  private manager!: User;
  public programmers: User[] = []
  private idProject: any;
  public tareas: Tarea[] = [];

  constructor(public location: Location, private router: Router, private userService: UserService, private tareaService: TareaService, private projectService: ProjectService) {
    this.idProject= this.router.url.split("/")[3];
  }

  ngOnInit(): void {
    this.getDatos();
    console.log(this.isManager);
  }

  getDatos() {
    this.getTareas()
    .then(correct => {
      if (correct) {
        this.getCurrentUser()
        .then(correct => {

          if (correct) {
            this.getProject()
            .then(correct => {

              if (correct) {
                this.getProgrammers()
                .then(correct => {
                  if (correct) {
                    this.workingOnProject = this.isWorkingOnProject();
                    this.getManager()
                    .then((manager: any) => {

                      if (manager._id === this.currentUser._id) {
                        this.isManager = true
                        console.log(this.isManager);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  getTareas() {
    return new Promise((resolve, reject) => {
      this.tareaService.getTareasProyectos(this.idProject)
      .subscribe({
        next: res => {
          this.tareas = res.tareas
          resolve(true)
        },
        error: err => {
          console.error(err);
          reject()
        }
      })
    })
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .subscribe({
        next: res => {
          this.currentUser = res.user
          resolve(true)
        },
        error: err => {
          console.error(err);
          reject()
        }
      })
    })
  }

  getProject() {
    return new Promise((resolve, reject) => {
      this.projectService.getProject(this.idProject)
      .subscribe({
        next: res => {
          this.currentProject = res.project
          resolve(true)
        },
        error: err => {
          console.error(err);
          reject();
        }
      })
    })
  }

  getProgrammers() {
    return new Promise((resolve, reject) => {
      if (this.tareas) {
        this.tareas.forEach(tarea => {
          tarea.programmers.forEach(prog => {

            this.userService.getUser(prog.toString())
            .subscribe({
              next: res => {
                if (!this.programmers.includes(res.user)) {
                  this.programmers.push(res.user)
                  console.log("Error");
                }
                resolve(true)
              },
              error: err => {
                console.error(err);
                reject()
              }
            })
          })
        })
        resolve(true)
      }
    })
  }

  getManager() {
    return new Promise((resolve, reject) => {
      this.userService.getUser(this.currentProject.manager)
      .subscribe ({
        next: res => {
          this.manager = res.user;
          resolve(res.user)
        },
        error: err => {
          console.error(err);
          reject()
        }
      })
    })
  }

  getProgrammerById(id: string) {
    let programmer;
    this.programmers.forEach(prog => {
      if(prog._id === id) {
        programmer = prog
      }
    });
    return programmer;
  }

  getAbbrName(id: string) {
    const prog: User = this.getProgrammerById(id)!;
    const abbrName = `${prog?.nombre.split(" ")[0][0]}${prog?.nombre.split(" ")[1][0]}`
    return abbrName;
  }

  getName(id: string) {
    const prog: User = this.getProgrammerById(id)!;
    const name = prog?.nombre;
    return name;
  }

  isAssigned(userData: any, programmers: any)  {
    let user = userData.user;
    let isAssigned = false

    programmers.forEach((prog:any) => {
      if (user._id === prog) {
        isAssigned = true;
      }
    });

    return isAssigned;
  }

  isWorkingOnProject() {
    let working = false
    this.programmers.forEach(prog => {
      if (prog._id === this.currentUser._id) {
        working = true;
      }
    });
    return true;
  }

  onSubmit(form: NgForm){}

  asignarTarea(id_tarea: string) {
    this.tareaService.asignarTarea(this.currentUser._id!, id_tarea)
    .subscribe({
      next: res => {
        console.log(res);
        window.location.reload();
      },
      error: err => {
        console.error(err);
      }
    })
  }

  goAddTarea() {
    this.router.navigateByUrl(`manager/add-tarea/${this.currentProject._id}`)
  }
}
