import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tableau } from 'src/app/models/tableau';
import { TableauxService } from 'src/app/services/tableaux.service';

@Component({
  selector: 'node-avendre',
  templateUrl: './avendre.component.html',
  styleUrls: ['./avendre.component.css']
})
export class AvendreComponent implements OnInit, OnDestroy {


  tableaux: Tableau[] = [];
  tableauSubscription: Subscription;

  constructor(private tableauxService: TableauxService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (request) => {
        this.tableauSubscription = this.tableauxService.tableauSubject.subscribe(
          (data: Tableau[]) => {
            const tabs = data.filter(tableau => {
              return (tableau.a_vendre == 1 && tableau.visible ==1);
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
