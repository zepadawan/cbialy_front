import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'node-myeditor',
  templateUrl: './myeditor.component.html',
  styleUrls: ['./myeditor.component.css']
})
export class MyEditorComponent implements OnInit {

  @Input() htmlText: string;
  constructor() { }

  ngOnInit(): void {
    this.htmlText = 'rrrrr';
  }

  onClick() {

  }

}
