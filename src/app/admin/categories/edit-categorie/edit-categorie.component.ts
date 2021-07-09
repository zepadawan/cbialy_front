import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'node-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {

  page = "Administration";
  currentpage = "Edition des catégories";
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
        this.categoryService.getCategoryNameById(params.id)
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

  onSubmit() {
    const newCategorie = new Category();
    const id = this.categorie.id;
    newCategorie.libelle = this.categorieForm.get('libelle').value;
    this.categoryService.updateCategory(id, newCategorie)
      .then(
        () => {
          this.successMessage = 'La modification est OK !';
          setTimeout(
            () => {
              this.successMessage = null;
              this.categorieForm.reset();
              this.router.navigate(['/admin-categories']);
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
  onExit() {

  }

}
