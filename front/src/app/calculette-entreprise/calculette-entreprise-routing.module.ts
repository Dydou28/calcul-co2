import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_services/auth-guard';
import { CalculetteEntrepriseComponent } from './calculette-entreprise.component';
import { QuestionnaireEntrepriseComponent } from './questionnaire-entreprise/questionnaire-entreprise.component';
import { ResultatEntrepriseComponent } from './resultat-entreprise/resultat-entreprise.component';

const routes: Routes = [
    {
        path: 'calculette-entreprise',
        component: CalculetteEntrepriseComponent,
        canActivate: [AuthGuard],
        children: [
        {
          path: 'questionnaire-entreprise',
          canActivate: [AuthGuard],
          component: QuestionnaireEntrepriseComponent,
        },
        {
          path: 'resultat-entreprise',
          canActivate: [AuthGuard],
          component: ResultatEntrepriseComponent,
        }
        ]
    },
    {
      path: '',
      redirectTo: 'calculette-entreprise/questionnaire-entreprise',
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
export class CalculetteEntrepriseRoutingModule { }