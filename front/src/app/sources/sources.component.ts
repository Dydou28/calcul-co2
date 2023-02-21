import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceIndice } from '../_models/source.model';
import { SourcesService } from '../_services/sources.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  constructor(private sourceService : SourcesService) { }


  conseil!: serviceIndice[];

  ngOnInit(): void {
   this.sourceService.allIndices().subscribe((data: any) => {
    this.conseil = data.indices
    console.log(this.conseil);
  }, (err) =>{
    console.log(err);
  })
}

}
