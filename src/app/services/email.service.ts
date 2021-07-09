import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email.model';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  sendMessage(email: Email) {
    const url = environment.api + 'email';
    return new Promise((resolve, reject) => {
      this.http.post(url, email).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            resolve(data);
          }
          else {
            reject(data.message);
          }
        },
        (err) => {

        }
      )
    })
  }
}
