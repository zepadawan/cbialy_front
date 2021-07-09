import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Tableau } from '../models/tableau';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carts: Cart[];
  cart: Cart;

  constructor() {
    this.initCarts();
  }

  initCarts(): void {

  }
}

