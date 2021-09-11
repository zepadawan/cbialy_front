import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Result } from 'src/app/models/result';
import { Tableau } from 'src/app/models/tableau';
import { CategoryService } from 'src/app/services/category.service';
import { TableauxService } from 'src/app/services/tableaux.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-show-tableau',
  templateUrl: './show-tableau.component.html',
  styleUrls: ['./show-tableau.component.css']
})
export class ShowTableauComponent implements OnInit {

  image: string;
  tableau: Tableau;
  refApiImage = `${environment.api_image}` + 'tableaux/';
  pathImage: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tableauxService: TableauxService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.tableauxService.getTableauById(params.id)
        .then((data: Result) => {
          this.tableau = data.args;
          this.image = this.refApiImage + this.tableau.nom_image;
        });
    })
  }
  onClose() {
    console.log('on close');

    this.router.navigate(['/avendre']);
  }




}
