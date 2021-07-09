import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { TableauxService } from '../../services/tableaux.service';


@Component({
  selector: 'node-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  tableaux = [];
  tableauSubscription: Subscription;

  constructor(private tableauService: TableauxService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.tableauSubscription = this.tableauService.tableauSubject.subscribe(
      (data) => {
        this.tableaux = this.tableauService.tableaux; //data;
      }
    );
    this.tableauService.emitTableaux();
  }

  ngOnDestroy() {
    this.tableauSubscription.unsubscribe();
  }
}
