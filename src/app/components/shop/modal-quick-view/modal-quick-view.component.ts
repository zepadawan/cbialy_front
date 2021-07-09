import { Component, Input, OnInit } from '@angular/core';
import { Tableau } from 'src/app/models/tableau';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  @Input() tableaux: Tableau[];
  prefUrlImage = `${environment.api_image}`;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(tableau: Tableau) {

  }
}
