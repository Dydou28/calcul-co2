import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calculette-perso',
  templateUrl: './calculette-perso.component.html',
  styleUrls: ['./calculette-perso.component.scss']
})
export class CalculettePersoComponent implements OnInit {
  public test = true;

  constructor(private translate: TranslateService,public router: Router){
     }

  ngOnInit(): void {
   
  }
  
  }

