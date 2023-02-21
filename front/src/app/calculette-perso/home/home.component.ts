import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalcpersoService } from 'src/app/_services/calcperso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private balanceId = '';

  constructor(private modalService: NgbModal,
    private router: Router,
    private calcPersoService: CalcpersoService) { }

  ngOnInit(): void {
  }

  initNewBalance(modal: any) {
    this.calcPersoService.initNewBalance().subscribe(
      (data: any) => {
        console.log(data);
        if (data.terminated === true) {
          window.localStorage.removeItem('balanceId');
          window.localStorage.setItem('balanceId', data.balanceId);
          this.router.navigate(['/calculette-perso/questionnaire/workplace']);
        } else {
          window.localStorage.removeItem('balanceId');
          window.localStorage.setItem('balanceId', data.balanceId);
          this.balanceId = data.balanceId;
          this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
        }
      }, (err) =>{
        console.log(err);
      })
  }

  continue() {
    this.calcPersoService.getBalance(this.balanceId).subscribe(
      (data: any) => {
        console.log(data);
        if (data.status === true) {
          let l = data.balance.steps.length;
          if (l > 0) {
            switch (data.balance.steps[l - 1].label) {
              case 'workPlace':
                this.router.navigate(['/calculette-perso/questionnaire/workplace']);
                break;
              case 'alimentation':
                this.router.navigate(['/calculette-perso/questionnaire/alimentation']);
                break;
              case 'numerique':
                this.router.navigate(['/calculette-perso/questionnaire/numerique']);
                break;
              case 'transport':
                this.router.navigate(['/calculette-perso/questionnaire/transport']);
                break;
              case 'achat':
                this.router.navigate(['/calculette-perso/questionnaire/achat']);
                break;
            }
          } else {
            this.router.navigate(['/calculette-perso/questionnaire/workplace']);
          }
          this.modalService.dismissAll();
        }
      }, (err) =>{
        console.log(err);
      })
  }

  newQuest() {
    this.calcPersoService.restartBalance().subscribe(
      (data: any) => {
        console.log(data);
        window.localStorage.removeItem('balanceId');
        window.localStorage.setItem('balanceId', data.balanceId);
        this.router.navigate(['/calculette-perso/questionnaire/workplace']);
      }, (err) =>{
        console.log(err);
      })
    this.modalService.dismissAll();
  }

}