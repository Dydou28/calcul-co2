import { Component, Input, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HomeCard } from '../_models/home_card.model';
import { HomeCardExport } from '../_services/home_card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeCardExport : HomeCardExport, private translateService: TranslateService ) {
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("lang change")
      this.homeCards = this.homeCardExport.getAllHomeCard();
    })
  }

  homeCards!:HomeCard[];

  ngOnInit(): void {
    this.homeCards = this.homeCardExport.getAllHomeCard();
  }

}
