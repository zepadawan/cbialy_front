import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result';
import { Texte } from 'src/app/models/texte';
import { TextesService } from 'src/app/services/textes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  refApiImages = environment.api_image + "christian/";
  textes: Texte[] = [];
  @Input() texte1: string;
  texte2: string;
  texte3: string;
  constructor(private textesService: TextesService) { }

  ngOnInit(): void {
    this.textesService.textesubject.subscribe(
      (data) => {
        this.textes = data;
        this.texte1 = this.textes[0].texte;
        console.log(this.texte1);
        this.texte2 = this.textes[1].texte;
        this.texte3 = this.textes[2].texte;
      }
    );
  }

}
