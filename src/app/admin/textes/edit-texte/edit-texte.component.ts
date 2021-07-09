import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Texte } from 'src/app/models/texte';
import { CategoryService } from 'src/app/services/category.service';
import { TextesService } from 'src/app/services/textes.service';

@Component({
  selector: 'node-edit-texte',
  templateUrl: './edit-texte.component.html',
  styleUrls: ['./edit-texte.component.css']
})
export class EditTexteComponent implements OnInit {

  page = "Administration";
  currentpage = "Edition des textes";
  parentPage = "Textes";

  texteForm: FormGroup;
  texte = new Texte();

  successMessage: string;
  errorMessage: string;

  pagesSelector: string[] = []
  @Input() htmlText: string;


  constructor(private fb: FormBuilder,
    private texteService: TextesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.initFormGroup();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.texteService.getTexteNameById(params.id)
          .then((data: Texte) => {
            this.texte = data;
            this.texteForm = this.fb.group({
              leTexte: [this.texte.texte, [Validators.required]],
              page_selector: [this.texte.page_selector,],
              numero: [this.texte.numero, [Validators.required]],
            })
          })
          .catch();
      }
    )
  }

  initFormGroup() {
    this.texteForm = this.fb.group({
      leTexte: ['', [Validators.required]],
      page_selector: ['',],
      numero: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const newTexte = new Texte();
    const id = this.texte.id;
    newTexte.texte = this.texteForm.get('leTexte').value;
    newTexte.page_selector = '';
    newTexte.numero = this.texteForm.get('numero').value;
    this.texteService.updateTexte(id, newTexte)
      .then(
        () => {
          this.successMessage = 'La modification est OK !';
          setTimeout(
            () => {
              this.successMessage = null;
              this.texteForm.reset();
              this.router.navigate(['/admin-textes']);
            }, 1000);
        }
      )
      .catch(
        (err) => {
          this.errorMessage = err.message;
        }
      );
    this.texteService.emitTextes();
  }

}
