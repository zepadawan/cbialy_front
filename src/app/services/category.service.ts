import { Result } from './../models/result';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Category } from './../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];
  categorySubject = new Subject<Category[]>();
  categorie: Category;

  constructor(private http: HttpClient) {
    this.getCategoriesFromServer();
  }

  emitCategories() {
    this.categorySubject.next(this.categories);
  }

  getCategoriesFromServer() {
    const url = `${environment.api}` + 'categories';
    return new Promise((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.categories = data.args;
          }
          this.emitCategories();
        },
        (err) => {
          console.log(err);
        }
      )
    })
  };

  getCategoryNameById(id: number) {
    const url = `${environment.api + 'categories/' + id}`;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (data: Result) => {
          if (data.status == 200) {
            this.categorie = data.args;
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


  createNewCategorie(newCategorie: Category) {
    const url = `${environment.api + 'categories'}`;
    return new Promise((resolve, reject) => {
      this.http.post(url, newCategorie).subscribe(
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

  updateCategory(id: number, categorie: Category) {
    const url = `${environment.api + 'categories/' + id}`;
    console.log(categorie);

    return new Promise((resolve, reject) => {
      this.http.put(url, categorie).subscribe(
        (data: Result) => {
          resolve(data);
          console.log('Update OK !');
          this.emitCategories();
        },
        (err) => {
          reject(false);
        })
    })
  };






}