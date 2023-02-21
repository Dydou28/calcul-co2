import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculetteOthersComponent } from './calculette-others.component';
import { CalculetteOthersRoutingModule } from './calculette-others-routing.module';



@NgModule({
  declarations: [
    CalculetteOthersComponent
  ],
  imports: [
    CommonModule,
    CalculetteOthersRoutingModule
  ]
})
export class CalculetteOthersModule { }
