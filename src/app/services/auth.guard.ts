import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService,
    private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        const isAuth = this.usersService.isAdmin;
        if (isAuth) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          reject(false);
        }
      }
    );
  }
}

