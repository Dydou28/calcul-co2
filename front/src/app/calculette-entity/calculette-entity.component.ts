import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculette-entity',
  templateUrl: './calculette-entity.component.html',
  styleUrls: ['./calculette-entity.component.scss']
})
export class CalculetteEntityComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
