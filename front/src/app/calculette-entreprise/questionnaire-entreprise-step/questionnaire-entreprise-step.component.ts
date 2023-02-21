import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire-entreprise-step',
  templateUrl: './questionnaire-entreprise-step.component.html',
  styleUrls: ['./questionnaire-entreprise-step.component.scss']
})
export class QuestionnaireEntrepriseStepComponent implements OnInit {
  public currentStep = 'questionnaire-entreprise';
  constructor(private route: Router){
      route.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
          console.log(val.url)
          switch (val.url) {
            case '/calculette-entreprise/questionnaire-entreprise':
              this.currentStep = 'questionnaire-entreprise';
              break;
            case '/calculette-entreprise/resultat-entreprise':
              this.currentStep = 'resultat-entreprise';
              break;
          }
        }
      });
     }

  ngOnInit(): void {
  }

}
