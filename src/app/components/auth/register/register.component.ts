import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'node-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage;
  successMessage;
  constructor(private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {


    this.registerForm = this.formBuilder.group({
      firstname: this.formBuilder.control('', [Validators.required]),
      lastname: this.formBuilder.control('', [Validators.required]),
      pseudo: this.formBuilder.control('', [Validators.required]),
      sexe: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      dateBirth: this.formBuilder.control('',),
    })
    this.registerForm.reset();

  }

  onSubmit(): void {
    const _firstname = this.registerForm.get('firstname').value;
    const _lastname = this.registerForm.get('lastname').value;
    const _pseudo = this.registerForm.get('pseudo').value;
    const _sexe = this.registerForm.get('sexe').value;
    const _email = this.registerForm.get('email').value;
    const _password = this.registerForm.get('password').value;
    const _dateBirth = this.registerForm.get('dateBirth').value;

    const newUser: User = {
      firstname: _firstname,
      lastname: _lastname,
      username: _pseudo,
      // sexe: _sexe,
      email: _email,
      password: _password,
      // role: _role
      // dateBirth: _dateBirth,
    }

    this.usersService.createUser(newUser)
      .then(
        (data: User) => {
          this.errorMessage = null;
          this.successMessage = data.dateBirth;
          setTimeout(() => {
            this.successMessage = null;
          }, 1000);
          this.router.navigate(['/shop']);
        }
      )
      .catch(
        (error) => {
          this.errorMessage = 'erreur' + error;
          setTimeout(() => {
            this.errorMessage = null;
          }, 1000);
        }
      );

  }
}
