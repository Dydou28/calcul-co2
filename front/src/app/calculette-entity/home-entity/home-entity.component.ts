import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculetteEntityExport } from 'src/app/_models/calculetteEntity.model';
import { CalculetteEntity } from 'src/app/_services/calculetteEntity.service';

@Component({
  selector: 'app-home-entity',
  templateUrl: './home-entity.component.html',
  styleUrls: ['./home-entity.component.scss']
})
export class HomeEntityComponent implements OnInit {

  constructor(private router: Router, private calcES : CalculetteEntity, ) { }

  agences!: CalculetteEntityExport[];

  ngOnInit(): void {
   this.calcES.getAllAgence().subscribe((data: any) => {
    this.agences = data.calculetteEntityModel
    console.log(this.agences);
  }, (err) =>{
    console.log(err);
  })
}

}
