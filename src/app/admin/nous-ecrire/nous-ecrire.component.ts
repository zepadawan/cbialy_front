import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/email.model';
import { ConfigService } from 'src/app/services/config.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'node-nous-ecrire',
  templateUrl: './nous-ecrire.component.html',
  styleUrls: ['./nous-ecrire.component.css']
})
export class NousEcrireComponent implements OnInit {

  emailForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  emailTo: string;

  constructor(private formBuilder: FormBuilder,
    private emailServices: EmailService,
    private configService: ConfigService,
    private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.emailTo = this.configService.getConfiguration().emailTo;


  }

  initRegisterForm(): void {
    this.emailForm = this.formBuilder.group({
      nom: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      subject: this.formBuilder.control('', []),
      message: this.formBuilder.control('', [Validators.required])

    })
    this.emailForm.reset();

  }

  onSubmit(): void {
    var newEemail = new Email();
    newEemail.nom = this.emailForm.get('nom').value;
    newEemail.email = this.emailForm.get('email').value;
    newEemail.subject = this.emailForm.get('subject').value;
    newEemail.message = this.emailForm.get('message').value;
    newEemail.emailTo = this.emailTo;
    this.emailServices.sendMessage(newEemail)
      .then(() => {
        this.successMessage = 'Mail envoyé!';
        setTimeout(
          () => {
            this.successMessage = "";
            this.router.navigate(['/accueil']);
          }
          , 1000);

      })
      .catch();
  }

}

