import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class TareaService {

  constructor(private http: HttpClient) {}

  getTarea(id: String): Observable<any> {
    return this.http.get(`http://localhost:3000/api/tarea/tarea?id=${id}`)
    .pipe(catchError(this.handleError));
  }

  getTareasProyectos(proyecto: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/tarea/tareas?proyecto=${proyecto}`)
    .pipe(catchError(this.handleError));
  }

  asignarTarea(prog_id: string, tarea_id: string): Observable<any> {
    return this.http.put(`http://localhost:3000/api/tarea/asignar`, {
      prog_id,
      tarea_id
    })
    .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      msg = error.error.message;
    } else {
      // Error del servidor
      msg = `Error Code: ${error.status};\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}
