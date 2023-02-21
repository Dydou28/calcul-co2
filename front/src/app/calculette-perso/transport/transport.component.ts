import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CalcpersoService } from 'src/app/_services/calcperso.service';
import { UpdateService } from 'src/app/_services/update.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})

export class TransportComponent implements OnInit {
  private balanceId = '';

  public formRaw = new FormGroup({
    distance: new FormControl(0, [Validators.required]),
    type: new FormControl('', [Validators.required]),
    subtype: new FormControl(''),
    subtype2: new FormControl(''),
  });

  public transportForm: any = [];

  constructor(private modalService: NgbModal,
    private calcPersoService: CalcpersoService,
    private http: HttpClient,
    private router: Router,
    private updateService: UpdateService) {  
  }

  

  ngOnInit(): void {
    this.getStepBalance('transport');
  }

  getStepBalance(stepName: String) {
    this.calcPersoService.getStepBalance(stepName).subscribe((data: any) => {
      this.balanceId = data.balanceId;
      console.log(data)
      if (data.status === true && data.balanceStep.length > 0) {
        this.calcPersoService.updateStepEnding(data.balanceStep)
        let balanceStepIndex = data.balanceStep.map(
          (s: any) => { if (s && s.label === stepName) return stepName;
           else return null;
          }
        ).indexOf(stepName);
        if (data.balanceStep[balanceStepIndex]?.questions && data.balanceStep[balanceStepIndex].questions.length > 0)
          this.transportForm = data.balanceStep[balanceStepIndex].questions;
        else 
          this.transportForm = [];
        console.log(this.transportForm, this.balanceId)
      }
    }, (err) => {
      
    })
  }

  add_row(modal: any) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  async onSubmit(){
    const form = this.formRaw.getRawValue();
    await this.transportForm.push(this.calcPersoService.parseTransportForm(form));
    console.log(this.transportForm ,this.calcPersoService.parseTransportForm(form))
    this.calcPersoService.updateStepBalance("transport", this.transportForm, this.balanceId)
    .subscribe(
      (data) => {
        
        this.getStepBalance('transport');
        this.modalService.dismissAll();
        this.updateService.sendUpdate('new transport field');
      }, (err) => {
        
      })
  }

  deleteOne(id: number) {
    this.transportForm.splice(id, 1);
    this.calcPersoService.deleteRow("transport", id, this.balanceId)
    .subscribe(
      (data) => {
        this.updateService.sendUpdate('new transport field');
      }, (err) => {
      })
  }

  nextStep(){
    this.router.navigate(['/calculette-perso/questionnaire/alimentation']);
  }

  previousStep(){
    this.router.navigate(['/calculette-perso/questionnaire/workplace']);
  }
}
