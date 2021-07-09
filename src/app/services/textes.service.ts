import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Texte } from '../models/texte';

@Injectable({
  providedIn: 'root'
})
export class TextesService {

  api = environment.api;
  textes: Texte[];
  texte: Texte;

  textesubject = new Subject<Texte[]>();

  constructor(private http: HttpClient) {
    this.getTextesFromServer();
  }

  emitTextes() {
    this.textesubject.next(this.textes);
  }

  async getTextesFromServer() {
    const url = `${environment.api + "textes"}`;
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.textes = data.args;
            resolve(data.args)
            this.emitTextes();
          } else {
            console.log('erreur = ' + data.message);
          }
        },
        (err) => {
          console.log(err);
        }
      )
    })
  };

  getTexteNameById(id: number) {
    const url = `${environment.api + 'textes/' + id}`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.texte = data.args;
            resolve(data.args);
          } else {
            reject(data.message);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    })
  };


  createNewTexte(newTexte: Texte) {
    const url = `${environment.api + 'textes'}`;
    return new Promise((resolve, reject) => {
      this.http.post(url, newTexte).subscribe(
        (data: Result) => {
          if (data.status == 201) {
            resolve(data.args);
          } else {
            reject(data.message);
          }
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      )
    })
  }

  updateTexte(id: number, texte: Texte) {
    const url = `${environment.api + 'textes/' + id}`;
    console.log(texte);
    return new Promise((resolve, reject) => {
      this.http.put(url, texte).subscribe(
        (data: Result) => {
          resolve(data);
          console.log('Update OK !');
          this.emitTextes();
        },
        (err) => {
          reject(false);
        })
    })
  };




}
