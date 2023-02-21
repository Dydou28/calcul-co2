import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalcpersoService } from 'src/app/_services/calcperso.service';
import { UpdateService } from 'src/app/_services/update.service';

declare var bootstrap: any;

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit, OnDestroy {
  messageReceived: any;
  private subscriptionName: Subscription;

  public balanceId: any;

  public progressTotal: number = 0;
  public progressMax: number = 100;
  public progressMaxWidth: number = 2;

  public workPlace: number = 0;
  public transport: number = 0;
  public numerique: number = 0;
  public alimentation: number = 0;
  public achat: number = 0;

  constructor(private calcPersoService: CalcpersoService,
    private updateService: UpdateService) {
    this.balanceId = window.localStorage.getItem('balanceId');
    this.subscriptionName= this.updateService.getUpdate().subscribe
     (message => { //message contains the data sent from service
     this.messageReceived = message;
     this.updateProgressBar();
     });
  }
  
 
  ngOnInit(): void {
    this.updateProgressBar();
  }

  updateProgressBar() {
    this.calcPersoService.getBalance(this.balanceId).subscribe(
      (data: any) => {
        console.log(data)
        data.balance.steps.map((s: any) => {
          if (s.label === 'workPlace')
            this.workPlace = s.totalCarbon / 1000;
          else if (s.label === 'transport')
            this.transport = s.totalCarbon / 1000;
          else if (s.label === 'numerique')
            this.numerique = s.totalCarbon / 1000;
          else if (s.label === 'alimentation')
            this.alimentation = s.totalCarbon / 1000;
          else if (s.label === 'achat')
            this.achat = s.totalCarbon / 1000;
        });
        this.progressTotal = this.workPlace + this.transport + this.numerique + this.alimentation + this.achat;
        if (this.progressTotal > 0.3) {
          this.progressMax = 100;
        } else
          this.progressMax = 2;
        if (this.progressTotal > 2) {
          this.progressMaxWidth = this.progressTotal;
        } else 
          this.progressMaxWidth = 2;
    }, (err) =>{
      console.log(err);
    }) 
  }
      
  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.subscriptionName.unsubscribe();
  }

}
