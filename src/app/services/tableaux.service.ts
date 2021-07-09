import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { Tableau } from '../models/tableau';
import { UsersService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class TableauxService {


  tableaux: Tableau[] = [];
  tableauSubject = new Subject<any[]>();
  //  tableau: Tableau;
  numberOfProductByPage = 9;
  nomberOfPage = 0;
  constructor(private http: HttpClient,
    private usersService: UsersService) {
    this.getTableauxFromServer();
  }

  emitTableaux() {
    this.tableauSubject.next(this.tableaux);
  }

  getTableauxFromServer(): any {

    const isAdmin = this.usersService.isAdmin;

    const url = `${environment.api + 'oeuvres'}`;
    return this.http.get<any>(url).subscribe(
      (data: Result) => {
        // const tabs = data.args.filter(tableau => {
        //   return (tableau.visible == 1);
        // })
        // this.tableaux = tabs;
        this.tableaux = data.args;
        this.emitTableaux();

      })
  }

  getTableauById(id: number) {
    const url = `${environment.api + 'oeuvres/' + id}`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            resolve(data);
          } else {
            reject(data.message);
          }
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  createNewTableau(newtableau: Tableau) {
    const url = `${environment.api + 'oeuvres'}`;
    const body = {
      tableau: newtableau
    }

    return new Promise((resolve, reject) => {
      this.http.post(url, newtableau).subscribe(
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

  updateTableau(id: number, tableau: Tableau) {
    const url = `${environment.api + 'oeuvres/' + id}`;
    const body = {
      tableau: tableau
    }
    return new Promise((resolve, reject) => {
      this.http.put(url, tableau).subscribe(
        (data: Result) => {
          resolve(data);
          this.emitTableaux();
        },
        (err) => {
          reject(err);
          console.log(err);
        }
      )
    })
  }

  deleteTableau(id:number){
    const url = `${environment.api + 'oeuvres/' + id}`;
    return new Promise( (resolve, reject)=>{
    this.http.delete(url).subscribe(
      (data) =>{
        resolve(data);
    },
    (err) => {
      reject(err);
    }
    )
    })

  }

  // Afficahege par pages => Pagination
  getProductbyPage(numberPage: number): Tableau[] {

    this.nomberOfPage = Math.trunc(this.tableaux.length / this.numberOfProductByPage);
    if (numberPage > 0 || numberPage <= (this.nomberOfPage)) {
      const prodResult = this.tableaux.slice(numberPage * this.numberOfProductByPage, (numberPage + 1) * this.numberOfProductByPage);
      return prodResult;
    }
    return null;

  }

  saveImageOnServer(file: File, id_categorie: number) {
    // if (file) {
    const urlImage = `${environment.api_image}`;
    const url = `${environment.api + 'upload'}`;
    let formdata: any = new FormData();
    formdata.append("sampleFile", file);
    formdata.append("id_categorie", id_categorie);

    this.http.post(url, formdata).subscribe(
      (data: Result) => {
        console.log('Image save in server');
      },
      (err) => {
        console.log(err);
      });
    // }
  }


}

