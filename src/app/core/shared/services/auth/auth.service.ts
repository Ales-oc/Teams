import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

/** Módulos */
import { AuthModule } from "./auth.module";

/** Modelos */
import { User } from "src/app/core/interfaces/user.interface";

@Injectable({
  providedIn: AuthModule
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  validateLogin(email:string, password:string): Observable<any> {
    return this.http.post('http://localhost:3000/api/login',{
      email: email,
      password: password
    })
    .pipe(catchError(this.handleError));
  }

  signUp(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', {
      user: user
    })
    .pipe(catchError(this.handleError));
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
