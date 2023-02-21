import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculette-entreprise',
  templateUrl: './calculette-entreprise.component.html',
  styleUrls: ['./calculette-entreprise.component.scss']
})
export class CalculetteEntrepriseComponent implements OnInit {

  constructor(private translate: TranslateService,public router: Router) { }

  ngOnInit(): void {
  }

}
