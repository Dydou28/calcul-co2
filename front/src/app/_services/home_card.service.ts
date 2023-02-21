import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { HomeCard } from "../_models/home_card.model";

@Injectable({
    providedIn: "root"
})

export class HomeCardExport{

    constructor(private translate: TranslateService) { }

    homeCardsfr : HomeCard[]= [
        {
            id: 1,
            card_title: "Calculette CO2 individuelle",
            card_description: "Nous vous proposons ici de réaliser une estimation de votre bilan carbone annuel dans vos activités professionnelles.",
            card_illustration: "assets/img/home_card/illustration1.png",
            button_text: "Accès outil",
            button_route: "calculette-perso/home"
        },
        {
            id: 2,
            card_title: "Questionnaire écoconception",
            card_description: "Afin d'eco-concevoir vos projets : ce court questionnaire pour démarrer vos projets",
            card_illustration: "assets/img/home_card/illustration2.png",
            button_text: "Accès outil",
            button_route: "questionnaire-eco"
        },
        {
            id: 3,
            card_title: "Calculette entreprise",
            card_description: "Pour vos clients entreprise : évaluez ensemble les gains en CO2 grâce à nos offres Orange Business Services",
            card_illustration: "assets/img/home_card/illustration3.png",
            button_text: "Accès outil",
            button_route: "calculette-entreprise/questionnaire-entreprise"
        },
        {
            id: 4,
            card_title: "Calculette CO2 Entité",
            card_description: "Un questionnaire d’auto-evaluation pour vous aider à écoconcevoir vos projets, quels qu’ils soient",
            card_illustration: "assets/img/home_card/illustration4.png",
            button_text: "Accès outil",
            button_route: "calculette-entity/home-entity"
        }
    ]

    homeCardsen : HomeCard[]= [
        {
            id: 1,
            card_title: "Individual CO2 calculator",
            card_description: "We suggest here that you make an estimate of your annual carbon footprint in your professional activities.",
            card_illustration: "assets/img/home_card/illustration1.png",
            button_text: "Tool access",
            button_route: "CalculettePerso/home"
        },
        {
            id: 2,
            card_title: "Eco conception quiz",
            card_description: "In order to eco-conceive your projects: this short questionnaire to start your projects",
            card_illustration: "assets/img/home_card/illustration2.png",
            button_text: "Tool access",
            button_route: "QuestionnaireEco"
        },
        {
            id: 3,
            card_title: "Business calculator",
            card_description: "For your business customers: evaluate CO2 savings together thanks to our Orange Business Services offers",
            card_illustration: "assets/img/home_card/illustration3.png",
            button_text: "Tool access",
            button_route: "calculette-entreprise/questionnaire-entreprise"
        },
        {
            id: 4,
            card_title: "Entity CO2 Calculator",
            card_description: "A questionnaire to auto-evaluate the eco-conception of your projects",
            card_illustration: "assets/img/home_card/illustration4.png",
            button_text: "Tool access",
            button_route: "calculette-entity/home-entity"
        }
    ]
    
    getAllHomeCard(): HomeCard[] {
        let lang = this.translate.currentLang;
        console.log(lang);
        if (lang == 'fr'){
            return this.homeCardsfr;
        }else if (lang == 'en'){
            return this.homeCardsen;
        }else{
            return this.homeCardsfr;
        }

    }
}