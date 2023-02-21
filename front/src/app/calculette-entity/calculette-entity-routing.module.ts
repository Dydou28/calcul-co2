import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_services/auth-guard';
import { CalculetteEntityComponent } from './calculette-entity.component';
import { HomeEntityComponent } from './home-entity/home-entity.component';

const routes: Routes = [
    {
        path: 'calculette-entity',
        component: CalculetteEntityComponent,
        canActivate: [AuthGuard],
        children: [
          {
          path: 'home-entity',
          canActivate: [AuthGuard],
          component: HomeEntityComponent
          }
        ]
    },
    {
      path: '',
      redirectTo: 'calculette-entity/home-entity',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalculetteEntityRoutingModule { }
