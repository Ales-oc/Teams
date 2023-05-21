import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

/** Modelos */
import { Project } from '../../core/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})

export class CrudTareaService {

  constructor(private http: HttpClient) {}

  createTask(nombre: String, proyecto: String, programmers: String[], deadline: String): Observable<any> {

    programmers = programmers.filter( prog => {
      return prog !== '';
    })

    return this.http.post('http://localhost:3000/api/tarea/new', {
      nombre,
      proyecto,
      programmers,
      deadline
    })
    .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      msg = error.error.message;
    } else {
      // Error del servidor
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(() => new Error(msg));
  }
}
