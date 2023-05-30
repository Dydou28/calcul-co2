import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupExport } from '../_models/group.model';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { CalcpersoService } from '../_services/calcperso.service';
import { GroupeService } from '../_services/group.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { forkJoin } from 'rxjs';
import { ResolutionService } from '../_services/resolution.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  currentGroupe: any;

  userId: any = localStorage.getItem('userId');
  groupes: any[] = [];
  public balance: any = [];
  public lastBalance: any = {};

  public TotalCarbon = {
    all: 0,
    workplace: 0,
    transport: 0,
    numerique: 0,
    alimentation: 0,
    achat: 0,
  };

  private evolutionChartData: any = {
    labels: [],
    datasets: [{ data: [], label: 'Bilan T.CO2/an' }],
  };

  // ---------------------- CHART
  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  public active = 1;

  // ---------------------- DOUGHNUT CHART

  // LAST BALANCE
  private lastBalanceChartData = {
    labels: [
      'Lieu de travail',
      'Transport',
      'Numérique',
      'Alimentation',
      'Achat',
    ],
    datasets: [
      {
        label: 'T.CO2',
        data: [0, 0, 0, 0, 0],
      },
    ],
  };
  public doughnutChartGlobalData: ChartConfiguration<'doughnut'>['data'] =
    this.lastBalanceChartData;
  public doughnutChartGlobalOptions: ChartConfiguration<'doughnut'>['options'] =
    {
      responsive: true,
    };

  // LIEU DE TRAVAIL
  private workplaceChartData = {
    labels: [
      'Chauffage Télétravail',
      'Air Conditionné Télétravail',
      'Présentiel',
      'Hotel',
    ],
    datasets: [
      {
        label: 'T.CO2',
        data: [0, 0, 0, 0],
      },
    ],
  };
  public doughnutChartWorkplaceData: ChartConfiguration<'doughnut'>['data'] =
    this.workplaceChartData;
  public doughnutChartWorkplaceOptions: ChartConfiguration<'doughnut'>['options'] =
    {
      responsive: true,
    };

  // TRANSPORT
  private transportChartData = {
    labels: [
      'Plane',
      'Car',
      'Carpooling',
      'Moto',
      'Scooter',
      'Train',
      'Eurostar',
      'Thalys',
      'Ter',
      'Bike',
      'Bus',
      'Subway',
    ],
    datasets: [
      {
        label: 'T.CO2',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  public doughnutChartTransportData: ChartConfiguration<'doughnut'>['data'] =
    this.transportChartData;
  public doughnutChartTransportOptions: ChartConfiguration<'doughnut'>['options'] =
    {
      responsive: true,
    };

  // NUMERIQUE
  private numeriqueChartData = {
    labels: [
      'Ecran',
      'Clavier',
      'Ordinateur',
      'Smartphone',
      'Tablette',
      'Imprimante',
      'Objet connecté',
      'Ligne internet à domicile',
      'Ligne mobile',
      'Ligne internet au bureau',
    ],
    datasets: [
      {
        label: 'T.CO2',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  public doughnutChartNumeriqueData: ChartConfiguration<'doughnut'>['data'] =
    this.numeriqueChartData;
  public doughnutChartNumeriqueOptions: ChartConfiguration<'doughnut'>['options'] =
    {
      responsive: true,
    };

  // ALIMENTATION
  private alimentationChartData = {
    labels: [
      'Viande Rouge',
      'Viande Blanche',
      'Fruits Saison',
      'fruits Hors Saison',
      'Lait',
      'Fromage',
      'Yaourts',
      'Creme',
      'Repas Vegan',
      'Poisson',
      'Cafe',
      'Chocolat',
    ],
    datasets: [
      {
        label: 'T.CO2',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  public doughnutChartAlimentationData: ChartConfiguration<'doughnut'>['data'] =
    this.alimentationChartData;
  public doughnutChartAlimentationOptions: ChartConfiguration<'doughnut'>['options'] =
    {
      responsive: true,
    };

  // ACHAT
  private achatChartData = {
    labels: [
      'nbLivre',
      'nbTshirt',
      'nbFourniture',
      'prixConseils',
      'donsAsso',
      'prixComService',
      'papier',
    ],
    datasets: [
      {
        label: 'T.CO2',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  public doughnutChartAchatData: ChartConfiguration<'doughnut'>['data'] =
    this.achatChartData;
  public doughnutChartAchatOptions: ChartConfiguration<'doughnut'>['options'] =
    {
      responsive: true,
    };

  // ---------------------- BAR CHART

  public barChartData: ChartConfiguration<'bar'>['data'] =
    this.evolutionChartData;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  errorResponse: string | undefined;
  totalBalance: any;
  nomGroupe: any;
  selectedGroupName: any;
  groupeName: any;
  groupForm = new FormGroup({
    groupName: new FormControl('', [Validators.required]),
  });
  groupe: any;
  nbPersonnes: any;
  average: any;
  percentage: any;
  lastBal: any;
  resolutions: any;
  username: any;
  newResolutionSubject: any;
  newResolutionLabel: any;

  constructor(
    private calcPersoService: CalcpersoService,
    private groupeService: GroupeService,
    private authService: AuthService,
    private userService: UserService,
    private resolutionService: ResolutionService
  ) {}

  ngOnInit(): void {
    this.carousel.pause();
    this.getAllBalance();
    this.groupeService.getCurrentGroupe(this.userId).subscribe((data) => {
      console.log(this.userId);
      console.log(data);
      this.nomGroupe = data.groupe.name;
      this.nbPersonnes = data.groupe.users.length;
    });
    this.resolutionService.readResolution(this.userId).subscribe((data) => {
      this.resolutions = data.resolutions.filter(
        (resolution: { userId: string }) => resolution.userId === this.userId
      );
    });
    // s'abonner aux nouvelles résolutions
    this.resolutionService.onNewResolution().subscribe((resolution) => {
      // ajouter la nouvelle résolution à la liste
      this.resolutions.push(resolution);
    });
    this.getUser();
    //this.onSubmit();
    this.getLastBalance();
    this.getAllGroupes();
    this.getTotalBalance();
    this.groupeService.getGroupe(this.userId).subscribe(
      (data) => {
        console.log(data);

        // Chercher l'objet qui contient l'utilisateur en question
        const groupe = data.groupes.find((g: { users: string | string[] }) =>
          g.users.includes(this.userId)
        );
        // console.log(groupe._id);

        if (groupe) {
          // Récupérer le nom du groupe
          const groupName = groupe.name;
          console.log(groupe);
          // Afficher le nom du groupe dans la console
          this.groupeName = groupName;
        } else {
          const mess = "L'utilisateur n'est membre d'aucun groupe";
          console.log("L'utilisateur n'est membre d'aucun groupe");
          this.groupeName = mess;
        }
      },
      (err) => {
        console.log(err);
        // Gérer les erreurs ici
      }
    );
  }
  getLastBalance() {
    this.calcPersoService.getLastBalance(this.userId).subscribe((data) => {
      console.log(data.balance[0].totalBalance);
      this.lastBal = data.balance[0].totalBalance;
    });
  }

  getAllBalance() {
    this.calcPersoService.getAllBalance().subscribe((data: any) => {
      if (data.status === true) {
        console.log(data);
        this.balance = data.balance;
        this.getLastBalanceDetailData();
        this.getAllBalanceData();
      }
    });
  }
  getAllGroupes() {
    this.groupeService.getAllGroupes().subscribe((data) => {
      this.groupes = data.groupes;
      console.log(data.groupes);
    });
  }

  getLastBalanceDetailData() {
    this.lastBalance = this.balance.reduce((a: any, b: any) => {
      return a.terminated === false
        ? b
        : b.terminated === false
        ? a
        : a.creationDate > b.creationDate
        ? a
        : b;
    });
    this.lastBalance.steps.map((s: any) => {
      if (s.label === 'workPlace') {
        this.lastBalanceChartData.datasets[0].data[0] = s.totalCarbon / 1000;
        this.TotalCarbon.all += s.totalCarbon / 1000;
        s.questions.map((q: any) => {
          if (q.label == 'distanceWorkHeaterType') {
            this.workplaceChartData.datasets[0].data[0] = q.totalCarbon / 1000;
          } else if (q.label == 'distanceWorkAirConditionner') {
            this.workplaceChartData.datasets[0].data[1] = q.totalCarbon / 1000;
          } else if (q.label == 'presentielWorkType') {
            this.workplaceChartData.datasets[0].data[2] = q.totalCarbon / 1000;
          } else if (q.label == 'hotelNuitNb') {
            this.workplaceChartData.datasets[0].data[3] = q.totalCarbon / 1000;
          }
        });
      } else if (s.label === 'transport') {
        this.lastBalanceChartData.datasets[0].data[1] = s.totalCarbon / 1000;
        this.TotalCarbon.all += s.totalCarbon / 1000;
        s.questions.map((q: any) => {
          var label = q.label.split(' | ');
          if (label[0] == 'plane') {
            this.transportChartData.datasets[0].data[0] = q.totalCarbon / 1000;
          } else if (label[0] == 'car') {
            this.transportChartData.datasets[0].data[1] = q.totalCarbon / 1000;
          } else if (label[0] == 'carpooling') {
            this.transportChartData.datasets[0].data[2] = q.totalCarbon / 1000;
          } else if (label[0] == 'moto') {
            this.transportChartData.datasets[0].data[3] = q.totalCarbon / 1000;
          } else if (label[0] == 'scooter') {
            this.transportChartData.datasets[0].data[4] = q.totalCarbon / 1000;
          } else if (label[0] == 'train') {
            this.transportChartData.datasets[0].data[5] = q.totalCarbon / 1000;
          } else if (label[0] == 'eurostar') {
            this.transportChartData.datasets[0].data[6] = q.totalCarbon / 1000;
          } else if (label[0] == 'thalys') {
            this.transportChartData.datasets[0].data[7] = q.totalCarbon / 1000;
          } else if (label[0] == 'ter') {
            this.transportChartData.datasets[0].data[8] = q.totalCarbon / 1000;
          } else if (label[0] == 'bike') {
            this.transportChartData.datasets[0].data[9] = q.totalCarbon / 1000;
          } else if (label[0] == 'bus') {
            this.transportChartData.datasets[0].data[10] = q.totalCarbon / 1000;
          } else if (label[0] == 'subway') {
            this.transportChartData.datasets[0].data[11] = q.totalCarbon / 1000;
          }
        });
      } else if (s.label === 'numerique') {
        this.lastBalanceChartData.datasets[0].data[2] = s.totalCarbon / 1000;
        this.TotalCarbon.all += s.totalCarbon / 1000;
        s.questions.map((q: any) => {
          var label = q.label.split(' | ');
          if (label[0] == 'Ecran') {
            this.numeriqueChartData.datasets[0].data[0] = q.totalCarbon / 1000;
          } else if (label[0] == 'Clavier') {
            this.numeriqueChartData.datasets[0].data[1] = q.totalCarbon / 1000;
          } else if (label[0] == 'Ordinateur') {
            this.numeriqueChartData.datasets[0].data[2] = q.totalCarbon / 1000;
          } else if (label[0] == 'Smartphone') {
            this.numeriqueChartData.datasets[0].data[3] = q.totalCarbon / 1000;
          } else if (label[0] == 'Tablette') {
            this.numeriqueChartData.datasets[0].data[4] = q.totalCarbon / 1000;
          } else if (label[0] == 'Imprimante') {
            this.numeriqueChartData.datasets[0].data[5] = q.totalCarbon / 1000;
          } else if (label[0] == 'Objet connecté') {
            this.numeriqueChartData.datasets[0].data[6] = q.totalCarbon / 1000;
          } else if (label[0] == 'internetDomicle') {
            this.numeriqueChartData.datasets[0].data[7] = q.totalCarbon / 1000;
          } else if (label[0] == 'internetMobile') {
            this.numeriqueChartData.datasets[0].data[8] = q.totalCarbon / 1000;
          } else if (label[0] == 'internetBureau') {
            this.numeriqueChartData.datasets[0].data[9] = q.totalCarbon / 1000;
          }
        });
      } else if (s.label === 'alimentation') {
        this.lastBalanceChartData.datasets[0].data[3] = s.totalCarbon / 1000;
        this.TotalCarbon.all += s.totalCarbon / 1000;
        s.questions.map((q: any) => {
          if (q.label === 'viandeRouge') {
            this.alimentationChartData.datasets[0].data[0] = q.totalCarbon;
          } else if (q.label === 'viandeBlanche') {
            this.alimentationChartData.datasets[0].data[1] = q.totalCarbon;
          } else if (q.label === 'fruitsSaison') {
            this.alimentationChartData.datasets[0].data[2] = q.totalCarbon;
          } else if (q.label === 'fruitsHorsSaison') {
            this.alimentationChartData.datasets[0].data[3] = q.totalCarbon;
          } else if (q.label === 'lait') {
            this.alimentationChartData.datasets[0].data[4] = q.totalCarbon;
          } else if (q.label === 'fromage') {
            this.alimentationChartData.datasets[0].data[5] = q.totalCarbon;
          } else if (q.label === 'yaourts') {
            this.alimentationChartData.datasets[0].data[6] = q.totalCarbon;
          } else if (q.label === 'creme') {
            this.alimentationChartData.datasets[0].data[7] = q.totalCarbon;
          } else if (q.label === 'nbRepasVegan') {
            this.alimentationChartData.datasets[0].data[8] = q.totalCarbon;
          } else if (q.label === 'poisson') {
            this.alimentationChartData.datasets[0].data[9] = q.totalCarbon;
          } else if (q.label === 'prepaCafe') {
            this.alimentationChartData.datasets[0].data[10] = q.totalCarbon;
          } else if (q.label === 'nbChoco') {
            this.alimentationChartData.datasets[0].data[11] = q.totalCarbon;
          }
        });
      } else if (s.label === 'achat') {
        this.lastBalanceChartData.datasets[0].data[4] = s.totalCarbon / 1000;
        this.TotalCarbon.all += s.totalCarbon / 1000;
        s.questions.map((q: any) => {
          if (q.label === 'nbLivre') {
            this.achatChartData.datasets[0].data[0] = q.totalCarbon;
          } else if (q.label === 'nbTshirt') {
            this.achatChartData.datasets[0].data[1] = q.totalCarbon;
          } else if (q.label === 'nbFourniture') {
            this.achatChartData.datasets[0].data[2] = q.totalCarbon;
          } else if (q.label === 'prixConseils') {
            this.achatChartData.datasets[0].data[3] = q.totalCarbon;
          } else if (q.label === 'donsAsso') {
            this.achatChartData.datasets[0].data[4] = q.totalCarbon;
          } else if (q.label === 'prixComService') {
            this.achatChartData.datasets[0].data[5] = q.totalCarbon;
          } else if (q.label === 'papier') {
            this.achatChartData.datasets[0].data[6] = q.totalCarbon;
          }
        });
      }
    });
  }

  getAllBalanceData() {
    this.balance.map((b: any) => {
      if (b.terminated == true) {
        this.evolutionChartData.labels.push(
          new Date(b.creationDate).toDateString()
        );
        let totalCarbon = 0;
        b.steps.map((s: any) => {
          if (s.label === 'workPlace') {
            totalCarbon += s.totalCarbon / 1000;
          } else if (s.label === 'transport') {
            totalCarbon += s.totalCarbon / 1000;
          } else if (s.label === 'numerique') {
            totalCarbon += s.totalCarbon / 1000;
          } else if (s.label === 'alimentation') {
            totalCarbon += s.totalCarbon / 1000;
          } else if (s.label === 'achat') {
            totalCarbon += s.totalCarbon / 1000;
          }
        });
        this.evolutionChartData.datasets[0].data.push(totalCarbon);
      }
    });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
  /*  ici */ onSubmit() {
    const groupNameControl = this.groupForm.getRawValue();
    const gpName = groupNameControl.groupName; // on recupere la valeur et nom l'objet groupe du formulaire

    if (groupNameControl) {
      //this.id = this.route.snapshot.paramMap.get('id');
      // const userId= this.authService.getUserId();
      const userId = localStorage.getItem('userId'); // ici on recupere localement la valeur de l'id stockée dans le cache du navigateur
      console.log(userId);
      this.groupeService.createGroupe(gpName, userId).subscribe(
        (data) => {
          console.log(data);
          this.groupes.push(data.groupe);
        },
        (err) => {
          console.log(err);
          this.errorResponse = err.error.message;
        }
      );

      /*const groupName = groupNameControl.value;
      const userId = this.authService.getUserId();
      this.groupeService.createGroupe(groupName).subscribe((result) => {
        console.log(result);
      });*/
    }
  }
  /*  ici */ onJoinGroupe() {
    location.reload();
    const userId = localStorage.getItem('userId') || '';
    const currentUserGroupe = this.groupes.find((g) =>
      g.users.includes(userId)
    );
    console.log(currentUserGroupe);
    const groupeId = this.selectedGroupName; // récupère l'id du groupe sélectionné dans le dropdown
    const selectedGroupe = this.groupes.find(
      //il récupère l'objet groupe correspondant à l'id sélectionn
      (groupe) => groupe._id === groupeId
    );
    if (selectedGroupe) {
      console.log(selectedGroupe.users);
      /* const nbPersonnes = selectedGroupe.users.length; //Nombre d'utilisateur present dans le groupe
      this.nbPersonnes = nbPersonnes;*/

      this.nomGroupe = selectedGroupe.name;
    }

    const currentGroupeId = currentUserGroupe ? currentUserGroupe._id : null;
    console.log(groupeId);
    console.log(currentGroupeId);
    if (currentGroupeId === groupeId) {
      console.log("L'utilisateur est déjà présent dans ce groupe.");
      const message = 'Vous êtes déjà dans le groupe';
      //this.message = message;

      return;
    }

    // L'utilisateur n'est pas déjà présent dans ce groupe, on peut l'ajouter
    if (currentUserGroupe) {
      // Retirer l'utilisateur de son ancien groupe
      this.groupeService.exitGroupe(userId).subscribe(
        (data) => {
          console.log(data);
          this.joinGroupe(userId, groupeId);
        },
        (err) => {
          console.log(err);
          // Gérer les erreurs icid
        }
      );
    } else {
      // Ajouter l'utilisateur au nouveau groupe directement
      this.joinGroupe(userId, groupeId);
    }
  }
  joinGroupe(userId: string, groupeId: string) {
    const currentUserGroupe = this.groupes.find((g) =>
      g.users.includes(userId)
    );
    if (currentUserGroupe) {
      // Retirer l'utilisateur de son ancien groupe
      this.groupeService.exitGroupe(userId).subscribe(
        (data) => {
          console.log(data);
          this.groupeService.joinGroupe(userId, groupeId).subscribe(
            (data) => {
              console.log(data);
              const nbPersonnes = data.result.users.length;
              this.nbPersonnes = nbPersonnes;
            },
            (err) => {
              console.log(err);
              // Gestion des erreurs
            }
          );
        },
        (err) => {
          console.log(err);
          // Gérer les erreurs ici
        }
      );
    } else {
      // Ajouter l'utilisateur au nouveau groupe directement
      this.groupeService.joinGroupe(userId, groupeId).subscribe(
        (data) => {
          console.log(data);
          const nbPersonnes = data.result.users.length;
          //this.nbPersonnes = nbPersonnes;
        },
        (err) => {
          console.log(err);
          // Gestion des erreurs
        }
      );
    }
  }

  getTotalBalance() {
    this.totalBalance = 0;
    this.groupeService.getCurrentGroupe(this.userId).subscribe((data1) => {
      console.log(data1.groupe);
      const length = data1.groupe.users.length;
      const observables = [];

      for (let index = 0; index < length; index++) {
        const user = data1.groupe.users[index];
        const observable = this.calcPersoService.getLastBalance(user);
        observables.push(observable);
      }

      forkJoin(observables).subscribe((results) => {
        this.totalBalance = results.reduce((sum, data) => {
          const balance = data.balance[0].totalBalance;
          return sum + balance;
        }, 0);

        console.log(this.totalBalance); // Somme totale des balances de tous les utilisateurs

        // Calculer la moyenne de totalBalance
        this.average = this.totalBalance / length;
        console.log(this.average); // Moyenne des balances de tous les utilisateurs
        //console.log(this.lastBal);

        if (this.average === 0) {
          // Gérer le cas où this.average est égal à zéro
          this.percentage = 0; // Ou une autre valeur appropriée selon votre logique
        } else {
          this.percentage =
            ((this.average - this.lastBal) / this.average) * 100;
        }

        console.log(this.percentage);

        // Affecter la valeur calculée à la variable totalBalance ici
        this.totalBalance = this.totalBalance;
      });
    });
  }

  getAverage() {
    console.log(this.getTotalBalance());
  }
  supprimerResolution(resolutionId: string) {
    const userId = localStorage.getItem('userId') || '';
    this.resolutionService.deleteResolution(resolutionId).subscribe(
      (res) => {
        console.log('supprimer');
        // Supprimer la résolution du tableau
        this.resolutions = this.resolutions.filter(
          (r: { _id: string }) => r._id !== resolutionId
        );
        console.log(res);
      },
      (err) => {
        // Gérer l'erreur
        console.log(err);
      }
    );
  }

  validerResolution(resolutionId: string, validate: boolean) {
    this.resolutionService.valideResolution(resolutionId, validate).subscribe(
      (res) => {
        console.log(res);
        /*this.resolutions = this.resolutions.filter(
          (r) => r._id !== resolutionId
        );*/
      },
      (err) => {
        // Gérer l'erreur
        console.log(err);
      }
    );
    location.reload();
  }
  /*  ici */ onReadResolution() {
    const userId = localStorage.getItem('userId') || '';
    this.resolutionService.readResolution(userId).subscribe(
      (res) => {
        // Gérer la réponse réussie du serveur

        console.log(res.resolutions[0]);
      },
      (err) => {
        // Gérer l'erreur
        console.log(err);
      }
    );
  }
  /*  ici */ onCreateResolution(): void {
    const label = this.newResolutionLabel;
    const userId = localStorage.getItem('userId') || '';
    this.resolutionService.createResolution(userId, label).subscribe(
      (res) => {
        //  location.reload();
        console.log(res.resolution.label);
        // Ajouter la nouvelle résolution à l'array resolutions
        this.resolutions.push(res.resolution);
        // Émettre la nouvelle résolution via le Subject newResolutionSubject
        this.newResolutionSubject.next(res.resolution);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /*********************************ESSAI ******************************/

  getUser() {
    const userId = localStorage.getItem('userId') || '';
    this.userService.getUser(userId).subscribe((data) => {
      console.log(data.username);
      this.username = data.username;
    });
  }
}
