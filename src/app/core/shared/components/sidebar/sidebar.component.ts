import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public user!: User
  public username!: String;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.userService.getCurrentUser()
    .subscribe({
      next: res => {
        this.user = res.user
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
        if (this.user.nombre.length > 5) {
          this.username = `${this.user.nombre.slice(0, 4)}...`
        } else {
          this.username = this.user.nombre;
        }
      }
    })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl("start")
  }

}


