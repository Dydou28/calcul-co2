import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultat-entreprise',
  templateUrl: './resultat-entreprise.component.html',
  styleUrls: ['./resultat-entreprise.component.scss']
})
export class ResultatEntrepriseComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

}
