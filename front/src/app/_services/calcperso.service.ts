import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class CalcpersoService {
  public stepEnding = {
    workPlace: false,
    transport: false,
    numerique: false,
    alimentation: false,
    achat: false,
  }

  constructor(public http: HttpClient) { }

  initNewBalance() {
    const userId = window.localStorage.getItem('userId');
    return this.http.post(environment.AUTH_API + 'user/'+userId+'/balance/individual',{
      },
      httpOptions
    );
  }

  restartBalance() {
    const userId = window.localStorage.getItem('userId');
    return this.http.post(environment.AUTH_API + 'user/'+userId+'/balance/individual/restart',{
      },
      httpOptions
    );
  }

  getAllBalance() {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + 'user/'+userId+'/balance/individual',
      httpOptions
    );
  }

  getBalance(balanceId: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + 'user/'+userId+'/balance/'+balanceId+'/individual',
      httpOptions
    );
  }

  getStepBalance(stepName: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + 'user/'+userId+'/balance/individual/step/'+stepName,
      httpOptions
    );
  }

  updateStepBalance(stepName: any, form: any, balanceId: any) {
    const userId = window.localStorage.getItem('userId');
    console.log(form)
    return this.http.put(environment.AUTH_API + 'user/'+userId+'/balance/'+balanceId+'/individual/step/'+stepName,
      {
        form
      },
      httpOptions
    );
  }

  deleteRow(stepName: any, questionId: any, balanceId: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.delete(
      environment.AUTH_API + 'user/'+userId+'/balance/'+balanceId+'/individual/step/'+stepName
      + '/'+ questionId,
      httpOptions
    );
  }

  updateStepEnding(form: any) {
    form.map(
      (s: any) => { 
        if (s.label === 'workPlace')
          this.stepEnding['workPlace'] = true
        else if (s.label === 'transport')
          this.stepEnding['transport'] = true
        else if (s.label === 'numerique')
          this.stepEnding['numerique'] = true
        else if (s.label === 'alimentation')
          this.stepEnding['alimentation'] = true
        else if (s.label === 'achat')
          this.stepEnding['achat'] = true
      }
    );
  }

  parseWorkPlaceForm(form: any) {
    return [
      {
        label: 'distanceWorkDays',
        resp: form.distanceWorkDays,
        totalCarbon: 0,
      },
      {
        label: 'distanceWorkHeater',
        resp: form.distanceWorkHeater,
        totalCarbon: 0,
      },
      {
        label: 'distanceWorkHeaterType',
        resp: form.distanceWorkHeaterType,
        totalCarbon: 0,
      },
      {
        label: 'distanceWorkAirConditionner',
        resp: form.distanceWorkAirConditionner,
        totalCarbon: 0,
      },
      {
        label: 'presentielWork',
        resp: form.presentielWork,
        totalCarbon: 0,
      },
      {
        label: 'presentielWorkType',
        resp: form.presentielWorkType,
        totalCarbon: 0,
      },
      {
        label: 'hotelNuitNb',
        resp: form.hotelNuitNb,
        totalCarbon: 0,
      },
      {
        label: 'hotelType',
        resp: form.hotelType,
        totalCarbon: 0,
      }
    ];
  }

  parseTransportForm(form: any) {
    return {
      label: form.type + (form.subtype 
        && (form.type === 'car' || form.type === 'carpooling' || form.type === 'moto' || form.type === 'plane')
         ? ' | ' + form.subtype : '') 
          + (form.subtype2 && form.type === 'carpooling' ? ' | ' + form.subtype2: ''),
      resp: form.distance,
      totalCarbon: 0
    };
  }

  parseNumeriqueForm(form: any) {
    return {
        label: form.numeriqueType + ' | ' + form.deviceStatus,
        resp: form.dataNb,
        totalCarbon: 0,
      };
  }

  parseAlimentationForm(form: any) {
    return [
      {
        label: 'viandeRouge',
        resp: form.viandeRouge,
        totalCarbon: 0,
      },
      {
        label: 'viandeBlanche',
        resp: form.viandeBlanche,
        totalCarbon: 0,
      },
      {
        label: 'fruitsSaison',
        resp: form.fruitsSaison,
        totalCarbon: 0,
      },
      {
        label: 'fruitsHorsSaison',
        resp: form.fruitsHorsSaison,
        totalCarbon: 0,
      },
      {
        label: 'lait',
        resp: form.lait,
        totalCarbon: 0,
      },
      {
        label: 'fromage',
        resp: form.fromage,
        totalCarbon: 0,
      },
      {
        label: 'yaourts',
        resp: form.yaourts,
        totalCarbon: 0,
      },
      {
        label: 'creme',
        resp: form.creme,
        totalCarbon: 0,
      },
      {
        label: 'nbRepasVegan',
        resp: form.nbRepasVegan,
        totalCarbon: 0,
      },
      {
        label: 'poisson',
        resp: form.poisson,
        totalCarbon: 0,
      },
      {
        label: 'prepaCafe',
        resp: form.prepaCafe,
        totalCarbon: 0,
      },
      {
        label: 'nbCafe',
        resp: form.nbCafe,
        totalCarbon: 0,
      },
      {
        label: 'nbChoco',
        resp: form.nbChoco,
        totalCarbon: 0,
      }
    ];
  }

  parseAchatForm(form: any) {
    return [
      {
        label: 'nbLivre',
        resp: form.nbLivre,
        totalCarbon: 0,
      },
      {
        label: 'nbTshirt',
        resp: form.nbTshirt,
        totalCarbon: 0,
      },
      {
        label: 'nbFourniture',
        resp: form.nbFourniture,
        totalCarbon: 0,
      },
      {
        label: 'prixConseils',
        resp: form.prixConseils,
        totalCarbon: 0,
      },
      {
        label: 'donsAsso',
        resp: form.donsAsso,
        totalCarbon: 0,
      },
      {
        label: 'prixComService',
        resp: form.prixComService,
        totalCarbon: 0,
      }
    ];
  }


}
