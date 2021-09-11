import { AuthGuard } from './services/auth.guard';
import { CategoryComponent } from './components/shop/category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/gui/home/home.component';
import { NotFoundComponent } from './components/gui/not-found/not-found.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleTableauComponent } from './components/shop/single-tableau/single-tableau.component';
import { TableauxComponent } from './components/shop/tableaux/tableaux.component';
import { ShowTableauComponent } from './admin/tableaux/show-tableau/show-tableau.component';

import { AdminCategoriesComponent } from './admin/categories/admin-categorie/admin-categorie.component';
import { EditCategorieComponent } from './admin/categories/edit-categorie/edit-categorie.component';

import { CreateCategorieComponent } from './admin/categories/create-categorie/create-categorie.component';

import { AdminTexteComponent } from './admin/textes/admin-texte/admin-texte.component';
import { CreateTexteComponent } from './admin/textes/create-texte/create-texte.component';
import { EditTexteComponent } from './admin/textes/edit-texte/edit-texte.component';
import { ShowTexteComponent } from './admin/textes/show-texte/show-texte.component';

import { EditTableauComponent } from './admin/tableaux/edit-tableau/edit-tableau.component';
import { AdminTableauComponent } from './admin/tableaux/admin-tableau/admin-tableau.component';
import { CreateTableauComponent } from './admin/tableaux/creation-tableau/creation-tableau.component';
import { NousEcrireComponent } from './admin/nous-ecrire/nous-ecrire.component';
import { AvendreComponent } from './components/shop/avendre/avendre.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'shop', component: ShopComponent, },
  { path: 'tableaux', component: TableauxComponent, },
  { path: 'avendre', component: AvendreComponent, },

  { path: 'single-tableau/:id', component: SingleTableauComponent, },
  { path: 'show-tableau/:id', component: ShowTableauComponent, },
  { path: 'category/:id', component: CategoryComponent, },

  // Administration
  { path: 'administration', component: AdminComponent, canActivate: [AuthGuard] },

  { path: 'admin-tableaux', component: AdminTableauComponent, canActivate: [AuthGuard] },
  { path: 'create-tableaux', component: CreateTableauComponent, canActivate: [AuthGuard] },
  { path: 'edit-tableaux/:id', component: EditTableauComponent, canActivate: [AuthGuard] },

  { path: 'admin-categories', component: AdminCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'edit-categorie/:id', component: EditCategorieComponent, canActivate: [AuthGuard] },
  { path: 'create-categories', component: CreateCategorieComponent, canActivate: [AuthGuard] },

  { path: 'admin-textes', component: AdminTexteComponent, canActivate: [AuthGuard] },
  { path: 'edit-texte/:id', component: EditTexteComponent, canActivate: [AuthGuard] },
  { path: 'create-texte', component: CreateTexteComponent, canActivate: [AuthGuard] },
  { path: 'show-texte', component: ShowTexteComponent, canActivate: [AuthGuard] },

  { path: 'nousEcrire', component: NousEcrireComponent },



  // Paiement
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },


  { path: '', component: ShopComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
