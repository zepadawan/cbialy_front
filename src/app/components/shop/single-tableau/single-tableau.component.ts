import { Category } from './../../../models/category';
import { Result } from './../../../models/result';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tableau } from 'src/app/models/tableau';
import { CartService } from 'src/app/services/cart.service';
import { TableauxService } from 'src/app/services/tableaux.service';
import { environment } from 'src/environments/environment';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'node-single-tableau',
  templateUrl: './single-tableau.component.html',
  styleUrls: ['./single-tableau.component.css']
})
export class SingleTableauComponent implements OnInit {

  tableau: Tableau;
  idCategorie: number;
  categorie: string;
  prefixUrlImage = environment.api_image + 'tableaux/';
  @Input() isAdmin: boolean;

  constructor(private route: ActivatedRoute,
    private tableauxService: TableauxService,
    private categoryService: CategoryService,
    private usersService: UsersService,
    private cartService: CartService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const id = this.route.snapshot.params['id'];
    this.tableauxService.getTableauById(id)
      .then((data: Result) => {
        this.tableau = data.args;
        this.idCategorie = this.tableau.id_category;
        this.getCategorieName(this.idCategorie);
      })
      .catch((data: Result) => {
      });
    const role = this.usersService.role;
    if (role) {
      this.isAdmin = ((role == 'admin') || (role == 'superadmin')) ? true : false;
    }

  }

  getCategorieName(id: number) {
    this.categoryService.getCategoryById(id)
      .then((data: Category) => {
        this.categorie = data.libelle;
      })
      .catch()

  }

  ngOnDestroy() {
  }

  onAddToCart(tableau: Tableau): void {
  }
}
