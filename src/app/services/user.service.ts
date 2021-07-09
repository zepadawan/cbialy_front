import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User;
  isAuth = false;
  isAdmin = true;
  userSubject = new Subject<User>();
  userId: number;
  token = "";
  role: string;

  constructor(private http: HttpClient) {
  }

  emitUsers(): void {
    this.userSubject.next(this.user);
  }

  authentifier(newUser: User) {
    const url = `${environment.api}` + 'users/login';
    const body = {
      "email": newUser.email,
      "password": newUser.password
    };
    return new Promise(
      (resolve, reject) => {
        this.http.post(url, body).subscribe(
          (data: Result) => {
            if (data.status == 200) {
              this.user = data.args;
              this.isAuth = true;
              this.role = this.user.role;
              this.isAdmin = ((this.role == "admin") || (this.role == "superadmin") ? true : false)
              this.userId = this.user.id;
              this.token = data.token
              resolve(data.result);
            } else {
              reject(data.message);
            }
          },
          (error) => {
            reject(error);
          }
        )
      });
  };


  createUser(newUser: User) {
    return new Promise(
      (resolve, reject) => {

        const url = `${environment.api}` + 'users/register'
        const body = {
          "firstname": newUser.firstname,
          "lastname": newUser.lastname,
          "username": newUser.username,
          "email": newUser.email,
          "password": newUser.password,
        };
        this.http.post(url, body).subscribe(
          (data: Result) => {
            if (data.status == 200) {
              this.user = data.args;
              this.isAuth = true;
              this.emitUsers();
              resolve(data.result);
            } else {
              reject(data.message);
            }
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }


  getParams() {
    const params = {
      isAuth: this.isAuth,
    }
    return params;
  }

  logOut(): void {
    this.user = null;
    this.isAuth = false;
    this.userSubject = new Subject<User>();
  }
}
