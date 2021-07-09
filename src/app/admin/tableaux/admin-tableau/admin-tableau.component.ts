import { Component, OnInit } from '@angular/core';
import { Tableau } from 'src/app/models/tableau';
import { TableauxService } from 'src/app/services/tableaux.service';

@Component({
  selector: 'node-admin-tableau',
  templateUrl: './admin-tableau.component.html',
  styleUrls: ['./admin-tableau.component.css']
})
export class AdminTableauComponent implements OnInit {

  currentpage = "Gestion des tableaux";
  parentPage = "Tableaux";
  page = "Administration";

  tableaux: Tableau[] = [];
  constructor(private tableauxService: TableauxService) { }

  ngOnInit(): void {
    this.tableaux = this.tableauxService.tableaux;
  }

}
