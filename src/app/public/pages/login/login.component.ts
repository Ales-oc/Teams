import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

/** Servicios */
import { AuthService } from '../../../core/shared/services/auth/auth.service';

/** Modelos */
import { User } from "src/app/core/interfaces/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  msgUnauth:String = "";
  submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private activateRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activateRoute.queryParams
    .subscribe(
      params => {
        if (params['authorized'] === 'false') {
          this.msgUnauth = "No está autorizado para entrar a esa ruta. Por favor, inicie sesión con una cuenta que sí lo esté.";
        } else {
          this.msgUnauth = "";
        }
      }
    );
  }

  signIn(form: NgForm) {
    this.submitted = true;
    if(form.valid){
      this.authService.validateLogin(form.value.email, form.value.password)
      .subscribe({
        next: async resp => {
          console.log(resp);
          sessionStorage.setItem('token', await resp.newToken);
          
          await this.router.navigate(['/home']);

        },
        error: err => {
          console.error(err);
        }
      })
    }
  }


}
