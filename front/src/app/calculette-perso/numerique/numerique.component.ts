import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CalcpersoService } from 'src/app/_services/calcperso.service';

@Component({
  selector: 'app-numerique',
  templateUrl: './numerique.component.html',
  styleUrls: ['./numerique.component.scss']
})
export class NumeriqueComponent implements OnInit {

  public numeriqueForm: any = [];

  private balanceId = '';

  public calcpersoForm3 = new FormGroup({
    numeriqueType: new FormControl('smartphone', [Validators.required]),
    dataNb: new FormControl(0, [Validators.required]),
    deviceStatus:new FormControl("non-reconditionne", [Validators.required])
  });

  constructor(private modalService: NgbModal, private calcPersoService: CalcpersoService, private http: HttpClient, private router : Router) {}

  ngOnInit(): void {
    this.getStepBalance('numerique');
  }

  getStepBalance(stepName: String) {
    // this.calcPersoService.getStepBalance(stepName).subscribe((data: any) => {
    //   this.balanceId = data.balanceId;
    //   if (data.status === true && data.balanceStep.length > 0) {
    //     this.calcPersoService.updateStepEnding(data.balanceStep)
    //     let balanceStepIndex = data.balanceStep.map(
    //       (s: any) => { if (s && s.label === stepName) return stepName;
    //        else return null;
    //       }
    //     ).indexOf(stepName);
    //     this.numeriqueForm = data.balanceStep[balanceStepIndex].questions;
    //   }
    // }, (err) => {
    //   console.log(err);
    // })
  }

  add_row(modal: any) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  async onSubmit(){
    const form = this.calcpersoForm3.getRawValue();
    await this.numeriqueForm.push(this.calcPersoService.parseNumeriqueForm(form));
    console.log(this.numeriqueForm ,this.calcPersoService.parseNumeriqueForm(form))
    this.calcPersoService.updateStepBalance("numerique", this.numeriqueForm, this.balanceId)
    .subscribe(
      (data) => {
        this.getStepBalance('numerique');
        this.modalService.dismissAll();
      }, (err) => {
        console.log(err);
      })
  }

  deleteOne(id: number) {
    this.numeriqueForm.splice(id, 1);
    this.calcPersoService.updateStepBalance("numerique", this.numeriqueForm, this.balanceId)
    .subscribe(
      (data) => {
        console.log(data);
        this.getStepBalance('numerique');
        this.modalService.dismissAll();
      }, (err) => {
        console.log(err);
      })
  }

  nextStep(){
    this.router.navigate(['/calculette-perso/questionnaire/alimentation']);
  }
  previousStep(){
    this.router.navigate(['/calculette-perso/questionnaire/transport']);
  }

}
