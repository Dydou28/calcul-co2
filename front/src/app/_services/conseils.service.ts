import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Conseils } from "../_models/conseils.model";

@Injectable({
    providedIn: "root"
})

export class ConseilsExport{

    constructor(private translate: TranslateService) { }

    conseils_liste_fr : Conseils[]= [
        {
            id: 1,
            conseils_title: "Le télétravail",
            conseils_description: "Une journée de télétravail émet beaucoup moins de CO2 qu'une journée aux bureaux et car a priori vous ne faites pas de trajet. Essayez de télé-travailler plusieurs fois dans la semaine !",
            conseils_step: "workplace"
        },
        {
            id: 2,
            conseils_title: "Le chauffage",
            conseils_description: "Quel sont les moyens de chauffage les moins polluants et les plus écologiques ? L’un des modes de chauffage parmi les plus économiques et les moins polluants sont les pompes à chaleur. Le principe des pompes à chaleur (ou PAC) repose sur le transfert de chaleur : une pompe à chaleur capte ainsi la chaleur d’une “source froide” (sol, air extérieur), augmente sa température et la restitue de la chaleur dans le logement. C’est le principe inverse à celui utilisé pour les réfrigérateurs.",
            conseils_step: "workplace"
        },
        {
            id: 3,
            conseils_title: "La climatisation",
            conseils_description: "La bio-climatisation, comment ça fonctionne ? La bio-climatisation, que l’on appelle aussi Rafraîchisseur d’Air Evaporatif (RAE), est un appareil mobile qui permet de rafraîchir l’air. Son secret : il utilise l’évaporation de l’eau pour rafraîchir naturellement l’air et ainsi baisser la température de votre intérieur. Son fonctionnement est très simple : l’appareil est alimenté en eau ; l’air ambiant est acheminé vers un filtre humidifié qui absorbe la chaleur ; l’air rafraîchit est diffusé l’air rafraîchit est diffusé dans votre maison grâce à une soufflerie.",
            conseils_step: "workplace"
        },
        {
            id: 4,
            conseils_title: "Travail en présentiel",
            conseils_description: "les co-working ou flex ou espaces dynamiques permettent d'accueillir plus d'une personne sur un même lieu : un taux de 70% correspond à 0,7 espace pour 1 collaborateur, soit 7 espaces pour 10 collaborateurs.",
            conseils_step: "workplace"
        },
        {
            id: 5,
            conseils_title: "Hôtels",
            conseils_description: "Il vaut mieux privilégier les hôtels éco-responsables plutôt que les chaînes multinationales : une nuit dans un hôtel traditionnel émet presque 7kg de CO2 alors qu'un hôtel écoresponsable consommera 85 % de moins.",
            conseils_step: "workplace"
        },
        {
            id: 6,
            conseils_title: "Le reconditionnement",
            conseils_description: "Produire un téléphone ou un ordinateur équivaut à un 50kg ou 280kg de co2. Pensez à en changer le moins souvent possible !",
            conseils_step: "numerique"
        },
        {
            id: 7,
            conseils_title: "L'avion",
            conseils_description: "L'avion est un moyen de transport polluant, pour 1 km il faut compter environ 200g CO2eq : si cela est possible il vaut mieux privilégier le train.",
            conseils_step: "transport"
        },
        {
            id: 8,
            conseils_title: "Le train",
            conseils_description: "Le train est recommandé pour les longs trajets et émet peu de CO2. 1 km en train équivaut à 11g de CO2.",
            conseils_step: "transport"
        },
        {
            id: 9,
            conseils_title: "La voiture",
            conseils_description: "La voiture est un moyen de transport polluant, pour 1 km il faut compter environ 193g CO2 émis. Si cela est possible, il vaut mieux privilégier le train et les transports doux.",
            conseils_step: "transport"
        },
        {
            id: 10,
            conseils_title: "Le covoiturage",
            conseils_description: "La quantité de CO2eq émise est constante pour un trajet, et plus le nombre de voyageurs par voiture sera grand, moins la quantité de CO2eq émise par voyageur sera elevée. Continuez dans cette voie.",
            conseils_step: "transport"
        },
        {
            id: 11,
            conseils_title: "La moto",
            conseils_description: "Attention la moto emet 170gCOeq par km, cela ne représente que 12,5% en moins qu'une voiture, sachant qu'avec une voiture, on peut faire du covoiturage.",
            conseils_step: "transport"
        },
        {
            id: 12,
            conseils_title: "Le scooter",
            conseils_description: "La moyenne des émissions d'un scooter 123cm3 est de 87g CO2eq par km : cela reste beacoup. Prenez plutôt el vélo !",
            conseils_step: "transport"
        },
        {
            id: 13,
            conseils_title: "La trottinette électrique",
            conseils_description: "La trottinette electrique émettrait indirectmenet 2,4g CO2eq par km. C'est un moyen de transport assez responsable, une bonne alternative au vélo. Attention à la sécurité (la votre et celle des autres !)",
            conseils_step: "transport"
        },
        {
            id: 14,
            conseils_title: "Le Bus",
            conseils_description: "Le bus génère en moyenne 5 fois moins qu'une voiture avec un seul passager à bord. C'est donc un excellent moyen de transport pour limiter votre imapct sur le climat : il émet 103g CO2eq par km.",
            conseils_step: "transport"
        },
        {
            id: 15,
            conseils_title: "Le Metro / RER",
            conseils_description: "Le métro / RER émet 38g CO2eq par km parcouru. Cela reste très faible pour de courts trajets, c'est un moyen de transport à privilégier.",
            conseils_step: "transport"
        },
        {
            id: 16,
            conseils_title: "Les viandes",
            conseils_description: "Manger de la viande émet presque 10 fois plus de CO2 que des aliments d'origine végétale. Privilégiez des protéines végétales !",
            conseils_step: "alimentation"
        },
        {
            id: 17,
            conseils_title: "Le café",
            conseils_description: "Apportez votre propre mug en alu ou incassable afin d'éviter de consommer du jetable",
            conseils_step: "alimentation"
        }
    ]

    conseils_liste_en : Conseils[]= [
        {
            id: 1,
            conseils_title: "Teleworking",
            conseils_description: "A day of teleworking emits much less CO2 than a day at the office and because you don't have to commute. Try to telework several times a week!",
            conseils_step: "workplace"
        },
        {
            id: 2,
            conseils_title: "Heater",
            conseils_description: "What are the least polluting and most ecological ways of heating? One of the most economical and least polluting heating methods is heat pumps. The principle of heat pumps (or PAC) is based on the transfer of heat: a heat pump thus captures heat from a 'cold source' (ground, outside air), increases its temperature and restores heat to the home. This is the opposite principle to that used for refrigerators.",
            conseils_step: "workplace"
        },
        {
            id: 3,
            conseils_title: "Air conditionner",
            conseils_description: "Bio-air conditioning, how does it work? The bio-air conditioning, also called Evaporative Air Cooler (EAC), is a mobile device that allows to cool the air. Its secret: it uses the evaporation of water to naturally cool the air and thus lower the temperature of your home. Its operation is very simple: the device is supplied with water; the ambient air is conveyed to a humidified filter which absorbs the heat; the refreshed air is diffused in your house thanks to a blower.",
            conseils_step: "workplace"
        },
        {
            id: 4,
            conseils_title: "Face-to-face work",
            conseils_description: "co-working or flex or dynamic spaces allow more than one person to work in the same place: a rate of 70% corresponds to 0.7 space for 1 employee, or 7 spaces for 10 employees.",
            conseils_step: "workplace"
        },
        {
            id: 5,
            conseils_title: "Hotels",
            conseils_description: "It is better to choose eco-responsible hotels rather than multinational chains: a night in a traditional hotel emits almost 7kg of CO2 whereas an eco-responsible hotel will consume 85% less.",
            conseils_step: "workplace"
        },
        {
            id: 6,
            conseils_title: "Reconditioning",
            conseils_description: "Producing a phone or a computer is equivalent to 50kg or 280kg of CO2. Think of changing them as little as possible!",
            conseils_step: "numerique"
        },
        {
            id: 7,
            conseils_title: "Plane",
            conseils_description: "The plane is a polluting means of transport, for 1 km it is necessary to count approximately 200g CO2eq: if it is possible it is better to prefer the train.",
            conseils_step: "transport"
        },
        {
            id: 8,
            conseils_title: "Train",
            conseils_description: "The train is recommended for long journeys and emits little CO2. 1 km by train is equivalent to 11g of CO2.",
            conseils_step: "transport"
        },
        {
            id: 9,
            conseils_title: "Car",
            conseils_description: "The car is a polluting means of transport, for 1 km it is necessary to count approximately 193g CO2 emitted. If possible, it is better to use the train and soft transport.",
            conseils_step: "transport"
        },
        {
            id: 10,
            conseils_title: "carpooling",
            conseils_description: "The amount of CO2eq emitted is constant for a trip, and the more passengers per car, the less CO2eq emitted per passenger. Keep it up.",
            conseils_step: "transport"
        },
        {
            id: 11,
            conseils_title: "Motorcycle",
            conseils_description: "Note that a motorcycle emits 170gCOeq per km, which is only 12.5% less than a car, knowing that with a car, you can carpool.",
            conseils_step: "transport"
        },
        {
            id: 12,
            conseils_title: "Scooter",
            conseils_description: "The average emission of a 123cm3 scooter is 87g CO2eq per km: this is still a lot. Take the bike instead!",
            conseils_step: "transport"
        },
        {
            id: 13,
            conseils_title: "Electric scooter",
            conseils_description: "The electric scooter would indirectly emit 2.4g CO2eq per km. It is a responsible way of transportation, a good alternative to the bicycle. Be careful about safety (yours and others!)",
            conseils_step: "transport"
        },
        {
            id: 14,
            conseils_title: "Bus",
            conseils_description: "The bus generates on average 5 times less than a car with one passenger on board. It is therefore an excellent means of transport to limit your imapct on the climate: it emits 103g CO2eq per km.",
            conseils_step: "transport"
        },
        {
            id: 15,
            conseils_title: "Subway",
            conseils_description: "The metro / RER emits 38g CO2eq per km travelled. This is still very low for short journeys, and is a preferred means of transport.",
            conseils_step: "transport"
        },
        {
            id: 16,
            conseils_title: "Meats",
            conseils_description: "Eating meat emits almost 10 times more CO2 than eating plant-based foods. Choose plant-based proteins!",
            conseils_step: "alimentation"
        },
        {
            id: 17,
            conseils_title: "Coffee",
            conseils_description: "Bring your own aluminum or unbreakable mug to avoid using disposable items",
            conseils_step: "alimentation"
        }
    ]
    
    getAllConseils(): Conseils[] {
        let lang = this.translate.currentLang;
        console.log(lang);
        if (lang == 'fr'){
            return this.conseils_liste_fr;
        }else if (lang == 'en'){
            return this.conseils_liste_en;
        }else{
            return this.conseils_liste_fr;
        }

    }
}