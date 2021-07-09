import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableauxService } from 'src/app/services/tableaux.service';
import { Tableau } from 'src/app/models/tableau';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'node-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  tableaux: Tableau[] = [];
  tableauSubscription: Subscription;

  constructor(private tableauxService: TableauxService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request) => {
        this.tableauSubscription = this.tableauxService.tableauSubject.subscribe(
          (data: Tableau[]) => {
            const tabs = data.filter(tableau => {
              return (tableau.id_category == +request.id);
            });
            this.tableaux = tabs;
          }
        );
        this.tableauxService.emitTableaux();
      }
    );
  };

  ngOnDestroy() {
    this.tableauSubscription.unsubscribe();
  }

}

