import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderAdminComponent } from './components/gui/header-admin/header-admin.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleTableauComponent } from './components/shop/single-tableau/single-tableau.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { FooterComponent } from './components/gui/footer/footer.component';
import { HeaderComponent } from './components/gui/header/header.component';
import { NotFoundComponent } from './components/gui/not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableauxComponent } from './components/shop/tableaux/tableaux.component';
import { HomeComponent } from './components/gui/home/home.component';
import { GuiComponent } from './components/gui/gui.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ModalAddToCartComponent } from './components/shop/modal-add-to-cart/modal-add-to-cart.component';
import { ModalQuickViewComponent } from './components/shop/modal-quick-view/modal-quick-view.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { EditCategorieComponent } from './admin/categories/edit-categorie/edit-categorie.component';
import { ShopComponent } from './components/shop/shop.component';

// Material
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import {MatIconModule} from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatNativeDateModule,  MAT_DATE_LOCALE } from '@angular/material/core';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// // import { MY_DATE_FORMAT } from './models/my-date-format';
// import { MatDatepickerModule,  } from '@angular/material/datepicker';
// import { MomentDateModule } from '@angular/material-moment-adapter';
// import {MatRadioModule} from '@angular/material/radio';

// tinymce
import { EditorModule } from '@tinymce/tinymce-angular';
import { MyEditorComponent } from './admin/myeditor/myeditor.component';

//RGPD
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

import { AdminTableauComponent } from './admin/tableaux/admin-tableau/admin-tableau.component';
import { CreateTableauComponent } from './admin/tableaux/creation-tableau/creation-tableau.component';
import { EditTableauComponent } from './admin/tableaux/edit-tableau/edit-tableau.component';
import { ShowTableauComponent } from './admin/tableaux/show-tableau/show-tableau.component';

import { AdminCategoriesComponent } from './admin/categories/admin-categorie/admin-categorie.component';
import { CreateCategorieComponent } from './admin/categories/create-categorie/create-categorie.component';

import { AdminTexteComponent } from './admin/textes/admin-texte/admin-texte.component';
import { CreateTexteComponent } from './admin/textes/create-texte/create-texte.component';
import { EditTexteComponent } from './admin/textes/edit-texte/edit-texte.component';
import { ShowTexteComponent } from './admin/textes/show-texte/show-texte.component';
import { NousEcrireComponent } from './admin/nous-ecrire/nous-ecrire.component';
import { ConfigService } from './services/config.service';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from './admin/confirmation-dialog/confirmation-dialog.component';

export function ConfigLoader(configService: ConfigService) {
  //Note: this factory need to return a function (that return a promise)
  return () => configService.onLoad(environment.configFile);
}
// rgpd
const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    // domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    domain: 'https://galeryofbialy.eu' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  position:"bottom-left",
  palette: {
    popup: {
      "background": "#000000",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    button: {
      "background": "#f1d600",
      "text": "#000000",
      "border": "transparent"
    }
  },
  theme: 'edgeless',
  type: 'info',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  // elements:{
  //   messagelink: `
  //   <span id="cookieconsent:desc" class="cc-message">{{message}}
  //     <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>,
  //     <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and our
  //     <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>
  //   </span>
  //   `,
  // },
  content:{
    // "message" : 'En utilisant notre site, vous reconnaissez avoir lu et compris nos  ',
    "message": "Ce site web utilise des cookies pour vous assurer la meilleure expérience de navigation sur notre site.",
    "dismiss": "OK, j'ai compris!",
    "deny": "Refuser",
    "link": "Plus d'information",
    "href": "https://cookiesandyou.com",
    "policy": "Cookie Policy",
    "header": "Cookies sur le site!",
    "allow": "Autoriser les cookies",

    cookiePolicyLink: 'Cookie Policy',
    cookiePolicyHref: 'https://cookie.com',

    privacyPolicyLink: 'Privacy Policy',
    privacyPolicyHref: 'https://privacy.com',

    tosLink: 'Terms of Service',
    tosHref: 'https://tos.com',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    SingleTableauComponent,
    CartComponent,
    FooterComponent,
    HeaderComponent,
    HeaderAdminComponent,
    NotFoundComponent,
    TableauxComponent,
    CategoryComponent,
    HomeComponent,
    GuiComponent,
    LoginComponent,
    RegisterComponent,
    ModalAddToCartComponent,
    ModalQuickViewComponent,
    AdminComponent,
    NousEcrireComponent,

    AdminTableauComponent,
    CreateTableauComponent,
    EditTableauComponent,
    ShowTableauComponent,

    AdminCategoriesComponent,
    CreateCategorieComponent,
    EditCategorieComponent,

    AdminTexteComponent,
    CreateTexteComponent,
    EditTexteComponent,
    ShowTexteComponent,

    MyEditorComponent,
     ConfirmationDialogComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,

    // Material
    // MatInputModule,
    // MatButtonModule,
    // MatCardModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatDialogModule,
    // MatGridListModule,
    // MatNativeDateModule,
    // MatDatepickerModule,
    // MomentDateModule,
    // MatRadioModule,


    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
