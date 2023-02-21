import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_services/auth-guard';
import { CalculetteOthersComponent } from './calculette-others.component';

const routes: Routes = [
    {
        path: 'calculette-others',
        component: CalculetteOthersComponent,
        canActivate: [AuthGuard],
        children: [
        ]
    },
    {
      path: '',
      redirectTo: 'calculette-others',
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
export class CalculetteOthersRoutingModule { }