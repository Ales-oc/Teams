import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})

export class RoutesGuard implements CanActivate {
  private canAccess: boolean = false;
  private roles: String[] = [];

  constructor(private userService: UserService, private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userService.getCurrentRoles()
      .subscribe({
        next: res => {
          this.roles = res.userRoles;
        },
        error: err => {
          let status = (err.message).split(';')[0]
          status = (status.split(':')[1]).trim();

          console.error(err.message);
          if (status === '401') {
            this.router.navigate(
              ['/start'],
              { queryParams:
                { authorized: false }
              }
            );
          }
        },
        complete: () => {
          this.checkAccess(route);
          if (!this.canAccess) {
            this.router.navigate(
              ['/start'],
              { queryParams:
                { authorized: false }
              }
            );
          } else {
            this.router.navigateByUrl(state.url)
          }
        }
      })
    return this.canAccess
  }

  checkAccess(route: ActivatedRouteSnapshot){
    this.canAccess = false;
    route.data['roles'].forEach((role: string) => {
      if (this.roles.includes(role)) this.canAccess = true;
    });
  }
}

