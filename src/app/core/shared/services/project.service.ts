import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get('http://localhost:3000/api/project/all')
    .pipe(catchError(this.handleError));
  }

  getProject(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/project/project?id=${id}`)
    .pipe(catchError(this.handleError));
  }

  getByFilter(nombre:string, manager:string, cliente:string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/project/filter?nombre=${nombre}&manager=${manager}&cliente=${cliente}`)
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
