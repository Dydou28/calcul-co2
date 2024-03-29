import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalcpersoService } from 'src/app/_services/calcperso.service';
import { UpdateService } from 'src/app/_services/update.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent implements OnInit {
  private balanceId = '';
  
  public calcpersoForm5 = new FormGroup({
    nbLivre: new FormControl(0, [Validators.required]),
    nbTshirt : new FormControl(0, [Validators.required]),
    nbFourniture : new FormControl(0, [Validators.required]),
    prixConseils : new FormControl(0, [Validators.required]),
    donsAsso : new FormControl(0, [Validators.required]),
    prixComService : new FormControl(0, [Validators.required])
  });

  constructor(private calcPersoService: CalcpersoService,
    private router : Router,
    private updateService: UpdateService) { }
  
  ngOnInit(): void {
    this.calcPersoService.getStepBalance('achat').subscribe((data: any) => {
      console.log(data);
      this.balanceId = data.balanceId;
      if (data.status === true && data.balanceStep.length > 0) {
        this.calcPersoService.updateStepEnding(data.balanceStep)
        let balanceStepIndex = data.balanceStep.map((s: any) => { if (s && s.label === 'achat') return 'achat'; else return null }).indexOf('achat');
        this.calcpersoForm5.setValue({
          nbLivre: data.balanceStep[balanceStepIndex]?.questions[0]?.resp || 0,
          nbTshirt: data.balanceStep[balanceStepIndex]?.questions[1]?.resp || 0,
          nbFourniture: data.balanceStep[balanceStepIndex]?.questions[2]?.resp || 0,
          prixConseils: data.balanceStep[balanceStepIndex]?.questions[3]?.resp || 0,
          donsAsso: data.balanceStep[balanceStepIndex]?.questions[4]?.resp || 0,
          prixComService: data.balanceStep[balanceStepIndex]?.questions[5]?.resp || 0,
        })
      }
    }, (err) => {
      console.log(err);
    })
  }

  onSubmit(){
    const form = this.calcpersoForm5.getRawValue();
    this.calcPersoService.updateStepBalance("achat", this.calcPersoService.parseAchatForm(form), this.balanceId)
    .subscribe(
      (data) => {
        console.log(data);
        this.updateService.sendUpdate('new achat field');
        this.router.navigate(['/profil']);
      }, (err) => {
        console.log(err);
      })

  }
  previousStep(){
    this.router.navigate(['/calculette-perso/questionnaire/alimentation']);
  }

}
