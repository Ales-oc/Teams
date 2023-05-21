import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/core/interfaces/tarea.interface';
import { TareaService } from '../../../core/shared/services/tarea.service';

@Component({
  selector: 'app-tarea-details',
  templateUrl: './tarea-details.component.html',
  styleUrls: ['./tarea-details.component.scss']
})
export class TareaDetailsComponent implements OnInit {

  private idTarea: String = "";
  public tarea!: Tarea;
  public estados: String[] = ['Sin comenzar', 'En progreso', 'En revisión', 'Completado']

  constructor(private router: Router, private tareaService: TareaService) {
    this.idTarea= this.router.url.split("/")[3];
  }

  ngOnInit(): void {
    this.tareaService.getTarea(this.idTarea)
    .subscribe({
      next: res => {
        console.log(res);
        this.tarea = res.tarea
      },
      error: err => {
        console.error(err);
      }
    })
  }

}
