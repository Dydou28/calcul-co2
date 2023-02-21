import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let res: boolean;
    return this.userService
      .checkToken()
      .toPromise()
      .then(
        (data) => {
          if (JSON.parse(data)['status'] === true) {
            return true;
          } else {
            this.userService.logOut();
            return false;
          }
        },
        (err) => {
            return this.userService.refreshToken()
            .toPromise()
            .then((data) => {
              this.userService.saveToken(data.accessToken);
              return true;
            },
            (err) => {
              this.userService.logOut();
              return false;
            })
        }
      );
  }
}
