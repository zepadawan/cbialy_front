import { UsersService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tableau } from 'src/app/models/tableau';
import { CartService } from 'src/app/services/cart.service';
import { TableauxService } from 'src/app/services/tableaux.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'node-tableaux',
  templateUrl: './tableaux.component.html',
  styleUrls: ['./tableaux.component.css']
})
export class TableauxComponent implements OnInit, OnDestroy {

  @Input() tableaux = [];
  @Input() ispaginate: boolean = true;
  @Input() isByCategories: boolean = false;
  @Input() isAdmin: boolean;

  prefixUrlImage = environment.api_image + 'tableaux/';
  tableauSubscription: Subscription;
  cartData;
  currentPage = 0;
  pages = [0, 1, 2, 3, 4, 5, 6, 7];

  constructor(private tableauService: TableauxService,
    private usersService: UsersService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.tableauService.getTableauxFromServer();
    this.tableauSubscription = this.tableauService.tableauSubject.subscribe(
      (data: Tableau[]) => {
        this.tableaux = data;
      },
      (err) => {
        console.log(err);
      }
    );

    const role = this.usersService.role;
    if (role) {
      this.isAdmin = ((role == 'admin') || (role == 'superadmin')) ? true : false;
    }
  }
  ngOnDestroy(): void {
    this.tableauSubscription.unsubscribe();
  }

  addToCart(tableau: Tableau): void {
  }

  deleteFromCart(tableau: Tableau): void {
  }

  changePage(numberPage: number): void {
    const tableaux = this.tableauService.getProductbyPage(numberPage);
    if (tableaux) {
      this.tableaux = tableaux;
      this.currentPage = numberPage;
    };
  }

  nextPage(): void {
    const newCurrentPage = this.currentPage + 1;
    const tableaux = this.tableauService.getProductbyPage(newCurrentPage);
    if (tableaux) {
      this.tableaux = tableaux;
      this.currentPage = newCurrentPage;
    }
  };

  prevPage(): void {
    const newCurrentPage = this.currentPage - 1;
    const tableaux = this.tableauService.getProductbyPage(newCurrentPage);
    if (tableaux) {
      this.tableaux = tableaux;
      this.currentPage = newCurrentPage;
    }
  }

  onShow(id: number) {
    this.router.navigate(['/show-tableau/' + id]);
  }

}
