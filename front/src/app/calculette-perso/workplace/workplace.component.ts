import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalcpersoService } from 'src/app/_services/calcperso.service';
import { Router } from '@angular/router';
import { SourcesService } from 'src/app/_services/sources.service';
import { serviceIndice } from 'src/app/_models/source.model';
import { UpdateService } from 'src/app/_services/update.service';


@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss']
})
export class WorkplaceComponent implements OnInit {
  private balanceId = '';
  
  public calcpersoForm1 = new FormGroup({
    distanceWorkDays: new FormControl(0, [Validators.required]),
    distanceWorkHeater : new FormControl(0, [Validators.required]),
    distanceWorkHeaterType : new FormControl('gaz', [Validators.required]),
    distanceWorkAirConditionner : new FormControl(0, [Validators.required]),
    presentielWork : new FormControl(0, [Validators.required]),
    presentielWorkType : new FormControl('singleOffice', [Validators.required]),
    hotelNuitNb : new FormControl(0, [Validators.required]),
    hotelType : new FormControl(0, [Validators.required])
  });

  constructor(private calcPersoService: CalcpersoService,
    private router: Router,
    private updateService: UpdateService) { }
  
  conseil!: serviceIndice[];

  ngOnInit(): void {
    this.calcPersoService.getStepBalance('workPlace').subscribe((data: any) => {
      console.log(data);
      this.balanceId = data.balanceId;
      if (data.status === true && data.balanceStep.length > 0) {
        this.calcPersoService.updateStepEnding(data.balanceStep)
        let balanceStepIndex = data.balanceStep.map((s: any) => { if (s && s.label === 'workPlace') return 'workPlace'; else return null }).indexOf('workPlace');
        this.calcpersoForm1.setValue({
          distanceWorkDays: data.balanceStep[balanceStepIndex]?.questions[0]?.resp || 0,
          distanceWorkHeater: data.balanceStep[balanceStepIndex]?.questions[1]?.resp || 0,
          distanceWorkHeaterType: data.balanceStep[balanceStepIndex]?.questions[2]?.resp || 'gaz',
          distanceWorkAirConditionner: data.balanceStep[balanceStepIndex]?.questions[3]?.resp || 0,
          presentielWork: data.balanceStep[balanceStepIndex]?.questions[4]?.resp || 0,
          presentielWorkType: data.balanceStep[balanceStepIndex]?.questions[5]?.resp || 'singleOffice',
          hotelNuitNb: data.balanceStep[balanceStepIndex]?.questions[6]?.resp || 0,
          hotelType: data.balanceStep[balanceStepIndex]?.questions[7]?.resp || 0,
        })
      }
    }, (err) => {
      console.log(err);
    })
  }


  onSubmit(){
    const form = this.calcpersoForm1.getRawValue();    
    this.calcPersoService.updateStepBalance("workPlace", this.calcPersoService.parseWorkPlaceForm(form), this.balanceId)
    .subscribe(
      (data) => {
        console.log(data);
        this.updateService.sendUpdate('new workPlace field');
        this.router.navigate(['/calculette-perso/questionnaire/transport']);
      }, (err) => {
        console.log(err);
      })
  }

}
