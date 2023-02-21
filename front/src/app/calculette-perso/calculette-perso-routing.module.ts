import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_services/auth-guard';
import { AchatComponent } from './achat/achat.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { CalculettePersoComponent } from './calculette-perso.component';
import { HomeComponent } from './home/home.component';
import { NumeriqueComponent } from './numerique/numerique.component';
import { TransportComponent } from './transport/transport.component';
import { WorkplaceComponent } from './workplace/workplace.component';

const routes: Routes = [
    {
        path: 'calculette-perso',
        component: CalculettePersoComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                canActivate: [AuthGuard],
                component: HomeComponent,
            },
            {
                path: 'questionnaire/workplace',
                canActivate: [AuthGuard],
                component: WorkplaceComponent
            },
            {
              path: 'questionnaire/transport',
              canActivate: [AuthGuard],
              component: TransportComponent
            },
            {
              path: 'questionnaire/numerique',
              canActivate: [AuthGuard],
              component: NumeriqueComponent
            },
            {
              path: 'questionnaire/alimentation',
              canActivate: [AuthGuard],
              component: AlimentationComponent
            },
            {
              path: 'questionnaire/achat',
              canActivate: [AuthGuard],
              component: AchatComponent
            }
        ]
    },
    {
      path: '',
      redirectTo: 'calculette-perso/home',
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
export class CalculettePersoRoutingModule { }
