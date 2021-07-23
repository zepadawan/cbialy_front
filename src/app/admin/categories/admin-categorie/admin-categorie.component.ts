import { Observable, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'node-admin-categories',
  templateUrl: './admin-categorie.component.html',
  styleUrls: ['./admin-categorie.component.css']
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {

  currentpage = "Gestion des catégories";
  parentPage = "Categories";
  page = "Administration";

  categories: Category[] = [];
  categorieprevious : Category;
  categoriecurrent  : Category;
  aa = new Observable<Category>();

  catLength;
  adminCategoriesSubscription: Subscription;
  constructor(private categoryServices: CategoryService) { }

  ngOnInit(): void {
    this.categoryServices.getCategoriesFromServer();;
    this.adminCategoriesSubscription = this.categoryServices.categorySubject.subscribe(
      (data) => {
        this.categories = this.categoryServices.categories;
      }
    );
    this.categoryServices.emitCategories();
  }

  ngOnDestroy(): void {
    this.adminCategoriesSubscription.unsubscribe();
  }

  getLength(): number {
    return (this.categories).length;
  }

  drop(event: CdkDragDrop<Category[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    console.log('event.previousIndex', event.previousIndex);
    console.log('event.currentIndex', event.currentIndex);
    this.onSubmit(event.previousIndex, event.currentIndex);
  }

  onSubmit(idprevious:number, idcurrent:number) {

  }



}
