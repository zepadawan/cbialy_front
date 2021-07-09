import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscribableOrPromise, Subscription } from 'rxjs';
import { Texte } from 'src/app/models/texte';
import { TextesService } from 'src/app/services/textes.service';

@Component({
  selector: 'node-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.css']
})
export class GuiComponent implements OnInit, OnDestroy {

  textes: Texte[] = [];
  texteSubscription: Subscription;
  constructor(private textesService: TextesService) { }

  ngOnInit(): void {
    this.texteSubscription = this.textesService.textesubject.subscribe(
      (data) => {
        this.textes = data;
      }
    );
    this.textesService.emitTextes();
  }

  ngOnDestroy(): void {
    this.texteSubscription.unsubscribe();
  }

}
