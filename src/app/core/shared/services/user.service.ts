import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users')
    .pipe(catchError(this.handleError));
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/user?id=${userId}`)
    .pipe(catchError(this.handleError));
  }

  getCurrentUser(): Observable<any> {
    return this.http.get('http://localhost:3000/api/current')
    .pipe(catchError(this.handleError))
  }

  getCurrentRoles(): Observable<any> {
    return this.http.get('http://localhost:3000/api/current-roles')
    .pipe(catchError(this.handleError));
  }

  getByRol(rol:string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/by-rol?rol=${rol}`)
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
