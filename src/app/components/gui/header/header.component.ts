import { CategoryService } from './../../../services/category.service';
import { Result } from './../../../models/result';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Category } from 'src/app/models/category';
import { Texte } from 'src/app/models/texte';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { TextesService } from 'src/app/services/textes.service';
import { UsersService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'node-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  carts: Cart[] = [];
  cartData: any;
  categories: Category[];
  categorySubcription: Subscription;
  cartSubsription: Subscription;
  userSubsription: Subscription;
  refApiImages = environment.api_image;


  @Input() isAuth = false;
  @Input() user: User;
  @Input() isAdmin = false;
  @Input() isSuperArmin = false;



  constructor(private cartService: CartService,
    private usersService: UsersService,
    private route: Router,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.carts = this.cartService.carts;
    this.categories = this.categoryService.categories;

    this.isAuth = this.usersService.isAuth;
    this.user = this.usersService.user;
    if (this.user) {
      this.isAdmin = ((this.user?.role == 'admin') || (this.user?.role == 'superadmin')) ? true : false;
      this.isSuperArmin = ((this.user?.role == 'superadmin')) ? true : false;
    }
  }

  ngOnDestroy(): void {
  }

  getTexte(id: number): string {
    return "";
  }
  onLogOut() {
    this.usersService.logOut();
    this.isAuth = this.usersService.isAuth;
    this.route.navigate(['/shop']);
  }

}
