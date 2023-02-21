import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public active = false;
  public isDemoCollapsed = true;

  siteLanguage = 'Fr';
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Francais' },
  ];
  
  constructor(private translate: TranslateService, public router : Router) {}

  ngOnInit(): void {
  }

  changeSiteLanguage(localeCode: string): void {
    const selectedLanguage = this.languageList
      .find((language) => language.code === localeCode)
      ?.label.toString();
    if (selectedLanguage) {
      this.siteLanguage = localeCode;
      this.translate.use(localeCode);
    }

  }

}
