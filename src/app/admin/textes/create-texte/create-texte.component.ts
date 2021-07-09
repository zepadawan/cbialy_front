import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Texte } from 'src/app/models/texte';
import { TextesService } from 'src/app/services/textes.service';

@Component({
  selector: 'node-create-texte',
  templateUrl: './create-texte.component.html',
  styleUrls: ['./create-texte.component.css']
})
export class CreateTexteComponent implements OnInit {

  page = "Administration";
  currentpage = "Création des textes";
  parentPage = "Textes";

  texteForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  constructor(private textesService: TextesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(other: boolean) {
    const newTexte = new Texte();
    newTexte.page_selector = this.texteForm.get('pagpage_selector').value;
    newTexte.numero = this.texteForm.get('numero').value;
    newTexte.texte = this.texteForm.get('texte').value;
    this.textesService.createNewTexte(newTexte)
      .then(
        () => {
          this.successMessage = 'La modification est OK !';
          setTimeout(
            () => {
              this.successMessage = null;
              this.texteForm.reset();
              if (other) {
                this.router.navigate(['/admin-categories']);
              } else {
              }
            }, 1000);
        }
      )
      .catch(
        (err) => {
          this.errorMessage = err.message;
        }
      );
    this.textesService.emitTextes();
  }


}
