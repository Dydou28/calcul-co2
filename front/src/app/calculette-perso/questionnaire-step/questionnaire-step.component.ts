import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CalcpersoService } from 'src/app/_services/calcperso.service';

@Component({
  selector: 'app-questionnaire-step',
  templateUrl: './questionnaire-step.component.html',
  styleUrls: ['./questionnaire-step.component.scss']
})
export class QuestionnaireStepComponent implements OnInit {
  public currentStep = 'home';
  constructor(private route: Router,
    public calcPersoService: CalcpersoService){
      route.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
          console.log(val.url)
          switch (val.url) {
            case '/calculette-perso/home':
              this.currentStep = 'home';
              break;
            case '/calculette-perso/questionnaire/workplace':
              this.currentStep = 'workplace';
              break;
            case '/calculette-perso/questionnaire/transport':
              this.currentStep = 'transport';
              break;
            case '/calculette-perso/questionnaire/numerique':
              this.currentStep = 'numerique';
              break;
            case '/calculette-perso/questionnaire/alimentation':
              this.currentStep = 'alimentation';
              break;
            case '/calculette-perso/questionnaire/achat':
              this.currentStep = 'achat';
              break;
          }
        }
      });
     }

  ngOnInit(): void {
  }

}
