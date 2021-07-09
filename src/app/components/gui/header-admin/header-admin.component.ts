import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'node-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  @Input() page: string;
  @Input() currentPage: string;
  @Input() parentPage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
