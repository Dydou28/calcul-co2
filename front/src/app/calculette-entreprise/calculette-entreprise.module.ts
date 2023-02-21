import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculetteEntrepriseComponent } from './calculette-entreprise.component';
import { CalculetteEntrepriseRoutingModule } from './calculette-entreprise-routing.module';
import { QuestionnaireEntrepriseComponent } from './questionnaire-entreprise/questionnaire-entreprise.component';
import { ResultatEntrepriseComponent } from './resultat-entreprise/resultat-entreprise.component';
import { QuestionnaireEntrepriseStepComponent } from './questionnaire-entreprise-step/questionnaire-entreprise-step.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalculetteEntrepriseComponent,
    QuestionnaireEntrepriseComponent,
    ResultatEntrepriseComponent,
    QuestionnaireEntrepriseStepComponent
  ],
  imports: [
    CommonModule,
    CalculetteEntrepriseRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalculetteEntrepriseModule { }
