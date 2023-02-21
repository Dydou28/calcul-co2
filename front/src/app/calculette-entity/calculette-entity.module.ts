import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculetteEntityComponent } from './calculette-entity.component';
import { CalculetteEntityRoutingModule } from './calculette-entity-routing.module';
import { HomeEntityComponent } from './home-entity/home-entity.component';



@NgModule({
  declarations: [
    CalculetteEntityComponent,
    HomeEntityComponent
  ],
  imports: [
    CommonModule,
    CalculetteEntityRoutingModule
  ]
})
export class CalculetteEntityModule { }
