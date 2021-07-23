import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { on } from 'events';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'node-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css']
})
export class CreateCategorieComponent implements OnInit {

  page = "Administration";
  currentpage = "Création des catégories";
  parentPage = "Categories";


  categorieForm: FormGroup;
  successMessage: string;
  errorMessage: string;

  categorie: Category;
  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    this.initFormGroup();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryService.getCategoryById(params.id)
          .then((data: Category) => {
            this.categorie = data;
            this.categorieForm = this.fb.group({
              libelle: [this.categorie.libelle, [Validators.required]],
            })
          })
          .catch();
      }
    )
  }

  initFormGroup() {
    this.categorieForm = this.fb.group({
      libelle: ['', [Validators.required]],
    });
  }

  onSubmit(other: boolean) {
    const newCategorie = new Category();
    newCategorie.libelle = this.categorieForm.get('libelle').value;
    this.categoryService.createNewCategorie(newCategorie)
      .then(
        () => {
          this.successMessage = 'La modification est OK !';
          setTimeout(
            () => {
              this.successMessage = null;
              this.categorieForm.reset();
              if (other) {
                this.router.navigate(['/admin-categories']);
              } else {
                // this.router.navigate(['/create-categories']);
              }
            }, 1000);
        }
      )
      .catch(
        (err) => {
          this.errorMessage = err.message;
        }
      );
    this.categoryService.emitCategories();
  }

}
