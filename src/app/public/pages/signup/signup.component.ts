import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/shared/services/auth/auth.service';

/** Modelos */
import { User } from "src/app/core/interfaces/user.interface";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  newUser!: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  signUp(form: NgForm) {

    this.submitted = true

    if (form.valid) {
      this.newUser =  {
        nombre: `${form.value.nombre} ${form.value.apellidos}`,
        email: form.value.email,
        password: form.value.password,
        roles: ["Programador"]
      }

      this.authService.signUp(this.newUser)
      .subscribe({
        next: resp => {
          console.log(resp);
          sessionStorage.setItem('token', resp.newToken);
          this.router.navigate(["/home"])
        },
        error: err => {
          console.error(err);
        }
      })
    }
  }

}
