import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalcproService } from 'src/app/_services/calcpro.service';

@Component({
  selector: 'app-questionnaire-entreprise',
  templateUrl: './questionnaire-entreprise.component.html',
  styleUrls: ['./questionnaire-entreprise.component.scss']
})
export class QuestionnaireEntrepriseComponent implements OnInit {

  public calcproForm = new FormGroup({
    nom_entreprise: new FormControl('', [Validators.required]),
    nom_contact : new FormControl('', [Validators.required]),
    inputEmail : new FormControl('', [Validators.required]),
    inputAddress : new FormControl('', [Validators.required]),
    inputAddress2 : new FormControl('', [Validators.required]),
    inputCity : new FormControl('', [Validators.required]),
    inputState : new FormControl('', [Validators.required]),
    inputZip : new FormControl(0, [Validators.required]),
    nb_salaries: new FormControl(0, [Validators.required]),
    pourc_teletravailleurs : new FormControl(0, [Validators.required]),
    nb_jours_teletravail : new FormControl(0, [Validators.required]),
    distance_dom_travail : new FormControl(0, [Validators.required]),
    part_voiture : new FormControl(0, [Validators.required]),
    part_commun : new FormControl(0, [Validators.required]),
    part_2roues : new FormControl(0, [Validators.required]),
    part_doux : new FormControl(0, [Validators.required]),
    dont_diesel: new FormControl(0, [Validators.required]),
    dont_essence : new FormControl(0, [Validators.required]),
    dont_hybride : new FormControl(0, [Validators.required]),
    dont_electrique : new FormControl(0, [Validators.required]),
    vitesse_moyenne : new FormControl(0, [Validators.required]),
    temps_transport : new FormControl(0, [Validators.required]),
    nb_reunions : new FormControl(0, [Validators.required]),
    nb_participants : new FormControl(0, [Validators.required]),
    distance_reunion: new FormControl(0, [Validators.required]),
    nb_vehicules : new FormControl(0, [Validators.required]),
    nb_km : new FormControl(0, [Validators.required]),
    nb_pages : new FormControl(0, [Validators.required]),
    nb_watt : new FormControl(0, [Validators.required]),
    nb_tel : new FormControl(0, [Validators.required]),
    offre_teletravail : new FormControl(0, [Validators.required]),
    ocean : new FormControl(0, [Validators.required]),
    openbee: new FormControl(0, [Validators.required]),
    flexible_engine : new FormControl(0, [Validators.required]),
    flexible_storage : new FormControl(0, [Validators.required]),
    orange_reprise : new FormControl(0, [Validators.required])
  });

  constructor(private calcProService: CalcproService,private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    const form = this.calcproForm.getRawValue();
    
    this.router.navigate(['/calculette-entreprise/resultat-questionnaire']);
  }

}
