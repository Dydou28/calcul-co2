import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Conseils } from 'src/app/_models/conseils.model';
import { ConseilsExport } from 'src/app/_services/conseils.service';

@Component({
  selector: 'app-conseils',
  templateUrl: './conseils.component.html',
  styleUrls: ['./conseils.component.scss']
})
export class ConseilsComponent implements OnInit {

  conseils! : Conseils[]

  constructor(public router : Router, private conseilsExport : ConseilsExport, private translateService: TranslateService ) {
    translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("lang change")
      this.conseils = this.conseilsExport.getAllConseils();
    })
  }

  ngOnInit(): void {
    this.conseils = this.conseilsExport.getAllConseils();
  }

}
