import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalcpersoService } from 'src/app/_services/calcperso.service';
import { UpdateService } from 'src/app/_services/update.service';

@Component({
  selector: 'app-alimentation',
  templateUrl: './alimentation.component.html',
  styleUrls: ['./alimentation.component.scss']
})
export class AlimentationComponent implements OnInit {
  private balanceId = '';
  
  public calcpersoForm4 = new FormGroup({
    viandeRouge: new FormControl(0, [Validators.required]),
    viandeBlanche : new FormControl(0, [Validators.required]),
    fruitsSaison : new FormControl(0, [Validators.required]),
    fruitsHorsSaison : new FormControl(0, [Validators.required]),
    lait : new FormControl(0, [Validators.required]),
    fromage : new FormControl(0, [Validators.required]),
    yaourts : new FormControl(0, [Validators.required]),
    creme : new FormControl(0, [Validators.required]),
    nbRepasVegan : new FormControl(0, [Validators.required]),
    poisson : new FormControl(0, [Validators.required]),
    prepaCafe : new FormControl('', [Validators.required]),
    nbCafe : new FormControl(0, [Validators.required]),
    nbChoco : new FormControl(0, [Validators.required])

  });

  constructor(private calcPersoService: CalcpersoService,
    private router : Router,
    private updateService: UpdateService) { }
  
  ngOnInit(): void {
    this.calcPersoService.getStepBalance('alimentation').subscribe((data: any) => {
      console.log(data);
      this.balanceId = data.balanceId;
      if (data.status === true && data.balanceStep.length > 0) {
        this.calcPersoService.updateStepEnding(data.balanceStep)
        let balanceStepIndex = data.balanceStep.map((s: any) => { if (s && s.label === 'alimentation') return 'alimentation'; else return null }).indexOf('alimentation');
        this.calcpersoForm4.setValue({
          viandeRouge: data.balanceStep[balanceStepIndex]?.questions[0]?.resp || 0,
          viandeBlanche: data.balanceStep[balanceStepIndex]?.questions[1]?.resp || 0,
          fruitsSaison: data.balanceStep[balanceStepIndex]?.questions[2]?.resp || 0,
          fruitsHorsSaison: data.balanceStep[balanceStepIndex]?.questions[3]?.resp || 0,
          lait: data.balanceStep[balanceStepIndex]?.questions[4]?.resp || 0,
          fromage: data.balanceStep[balanceStepIndex]?.questions[5]?.resp || 0,
          yaourts: data.balanceStep[balanceStepIndex]?.questions[6]?.resp || 0,
          creme: data.balanceStep[balanceStepIndex]?.questions[7]?.resp || 0,
          nbRepasVegan: data.balanceStep[balanceStepIndex]?.questions[8]?.resp || 0,
          poisson: data.balanceStep[balanceStepIndex]?.questions[9]?.resp || 0,
          prepaCafe: data.balanceStep[balanceStepIndex]?.questions[10]?.resp || 0,
          nbCafe: data.balanceStep[balanceStepIndex]?.questions[11]?.resp || 0,
          nbChoco: data.balanceStep[balanceStepIndex]?.questions[12]?.resp || 0
        })
      }
    }, (err) => {
      console.log(err);
    })
  }

  onSubmit(){
    const form = this.calcpersoForm4.getRawValue();
    this.calcPersoService.updateStepBalance("alimentation", this.calcPersoService.parseAlimentationForm(form), this.balanceId)
    .subscribe(
      (data) => {
        console.log(data);
        this.updateService.sendUpdate('new alimentation field');
        this.router.navigate(['/calculette-perso/questionnaire/achat']);
      }, (err) => {
        console.log(err);
      });
    }
 
  previousStep(){
    this.router.navigate(['/calculette-perso/questionnaire/numerique']);
  }

}
