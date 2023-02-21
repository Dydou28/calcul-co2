import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculettePersoRoutingModule } from './calculette-perso-routing.module';
import { CalculettePersoComponent } from './calculette-perso.component';
import { NgxTranslateModule } from '../translate/translate.module';
import { QuestionnaireStepComponent } from './questionnaire-step/questionnaire-step.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { TransportComponent } from './transport/transport.component';
import { NumeriqueComponent } from './numerique/numerique.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { AchatComponent } from './achat/achat.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ConseilsComponent } from './conseils/conseils.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalculettePersoComponent,
    QuestionnaireStepComponent,
    WorkplaceComponent,
    TransportComponent,
    NumeriqueComponent,
    AlimentationComponent,
    AchatComponent,
    ProgressbarComponent,
    ConseilsComponent
  ],
  imports: [
    CommonModule,
    CalculettePersoRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CalculettePersoModule { }
