import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nextTick } from 'process';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'node-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  loginSubscription: Subscription;
  errorMessage: string;
  page = 'Connexion';
  currentpage = "Se Connecter";
  parentPage = "connexion";
  showPassword = false;

  constructor(private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService) { };

  ngOnInit(): void {
    this.initFormLogin();
    this.loginForm.reset();
  }

  initFormLogin() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.email]),
      password: this.fb.control('', [Validators.minLength(3)])
    });
  }

  onSubmit(): void {
    // recupération des champs du formulaire
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const newUser: User = { email: email, password: password };

    this.usersService.authentifier(newUser)
      .then(
        (data) => {
          const carts = this.cartService.carts;
          // if (carts.length > 0) {
          if (carts) {
            this.router.navigate(['/checkout']);
          } else {
            this.router.navigate(['/shop']);
            this.loginForm.reset();
          }
        }
      )
      .catch(
        (error) => {
          this.errorMessage = error;
          setTimeout(
            () => {
              this.errorMessage = null;
            }, 1000);
        }
      )
  };

  onShowPassword() {
    this.showPassword = !this.showPassword;

  }

}
