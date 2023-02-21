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
export class CalcproService {

  constructor(public http: HttpClient) { }

  

  parseWorkPlaceForm(form: any) {
    return [
      {
        label: 'nom_entreprise',
        resp: form.nom_entreprise,
        totalCarbon: 0,
      },
      {
        label: 'nom_contact',
        resp: form.nom_contact,
        totalCarbon: 0,
      },
      {
        label: 'inputEmail',
        resp: form.inputEmail,
        totalCarbon: 0,
      },
      {
        label: 'inputAddress',
        resp: form.inputAddress,
        totalCarbon: 0,
      },
      {
        label: 'inputAdress2',
        resp: form.inputAdress2,
        totalCarbon: 0,
      },
      {
        label: 'inputCity',
        resp: form.inputCity,
        totalCarbon: 0,
      },
      {
        label: 'inputState',
        resp: form.inputState,
        totalCarbon: 0,
      },
      {
        label: 'inoutZip',
        resp: form.inoutZip,
        totalCarbon: 0,
      },
      {
        label: 'nb_salaries',
        resp: form.nb_salaries,
        totalCarbon: 0,
      },
      {
        label: 'pourc_teletravailleurs',
        resp: form.pourc_teletravailleurs,
        totalCarbon: 0,
      },
      {
        label: 'nb_jours_teletravail',
        resp: form.nb_jours_teletravail,
        totalCarbon: 0,
      },
      {
        label: 'distance_dom_travail',
        resp: form.distance_dom_travail,
        totalCarbon: 0,
      },
      {
        label: 'part_voiture',
        resp: form.part_voiture,
        totalCarbon: 0,
      },
      {
        label: 'part_commun',
        resp: form.part_commun,
        totalCarbon: 0,
      },
      {
        label: 'part_2roues',
        resp: form.part_2roues,
        totalCarbon: 0,
      },
      {
        label: 'part_doux',
        resp: form.part_doux,
        totalCarbon: 0,
      },
      {
        label: 'dont_diesel',
        resp: form.dont_diesel,
        totalCarbon: 0,
      },
      {
        label: 'dont_essence',
        resp: form.dont_essence,
        totalCarbon: 0,
      },
      {
        label: 'dont_hybride',
        resp: form.dont_hybride,
        totalCarbon: 0,
      },
      {
        label: 'dont_electrique',
        resp: form.dont_electrique,
        totalCarbon: 0,
      },
      {
        label: 'vitesse_moyenne',
        resp: form.vitesse_moyenne,
        totalCarbon: 0,
      },
      {
        label: 'temps_transport',
        resp: form.temps_transport,
        totalCarbon: 0,
      },
      {
        label: 'nb_reunions',
        resp: form.nb_reunions,
        totalCarbon: 0,
      },
      {
        label: 'nb_participants',
        resp: form.nb_participants,
        totalCarbon: 0,
      },
      {
        label: 'distance_reunion',
        resp: form.distance_reunion,
        totalCarbon: 0,
      },
      {
        label: 'nb_vehicules',
        resp: form.nb_vehicules,
        totalCarbon: 0,
      },
      {
        label: 'nb_km',
        resp: form.nb_km,
        totalCarbon: 0,
      },
      {
        label: 'nb_pages',
        resp: form.nb_pages,
        totalCarbon: 0,
      },
      {
        label: 'nb_watt',
        resp: form.nb_watt,
        totalCarbon: 0,
      },
      {
        label: 'nb_tel',
        resp: form.nb_tel,
        totalCarbon: 0,
      },
      {
        label: 'offre_teletravail',
        resp: form.offre_teletravail,
        totalCarbon: 0,
      },
      {
        label: 'ocean',
        resp: form.ocean,
        totalCarbon: 0,
      },
      {
        label: 'openbee',
        resp: form.openbee,
        totalCarbon: 0,
      },
      {
        label: 'flexible_engine',
        resp: form.flexible_engine,
        totalCarbon: 0,
      },
      {
        label: 'flexible_storage',
        resp: form.flexible_storage,
        totalCarbon: 0,
      },
      {
        label: 'orange_reprise',
        resp: form.orange_reprise,
        totalCarbon: 0,
      }
    ];
  }
}
