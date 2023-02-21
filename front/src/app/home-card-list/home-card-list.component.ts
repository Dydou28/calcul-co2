import { Component, OnInit } from '@angular/core';
import { HomeCard } from '../_models/home_card.model';
import { HomeCardExport } from '../_services/home_card.service';

@Component({
  selector: 'app-home-card-list',
  templateUrl: './home-card-list.component.html',
  styleUrls: ['./home-card-list.component.scss']
})
export class HomeCardListComponent implements OnInit {

  homeCards!:HomeCard[];

  constructor(private homeCardExport: HomeCardExport) {}

  ngOnInit(): void {
    this.homeCards = this.homeCardExport.getAllHomeCard();
  }

}
