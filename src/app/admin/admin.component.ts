import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'node-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentpage = "";
  constructor() { }

  ngOnInit(): void {
  }

}
