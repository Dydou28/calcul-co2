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
import { GroupService } from '../_services/group.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
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
      'BVus',
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

  // NUMERQUE
  // private NumeriqueChartData = {
  //   labels: [],
  //   datasets: [
  //     {
  //       label: 'T.CO2',
  //       data: []
  //     },
  //   ]
  // };
  // public doughnutChartNumeriqueData: ChartConfiguration<'doughnut'>['data'] = this.NumeriqueChartData;
  // public doughnutChartNumeriqueOptions: ChartConfiguration<'doughnut'>['options'] = {
  //   responsive: true,
  // };

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

  constructor(
    private calcPersoService: CalcpersoService,
    private groupService: GroupService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.carousel.pause();
    this.getAllBalance();
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
            this.alimentationChartData.datasets[0].data[12] = q.totalCarbon;
          }
        });
      } else if (s.label === 'achat') {
        this.lastBalanceChartData.datasets[0].data[4] = s.totalCarbon / 1000;
        this.TotalCarbon.all += s.totalCarbon / 1000;
        s.questions.map((q: any) => {
          if (q.label === 'nbLivre') {
            this.achatChartData.datasets[0].data[0] = q.totalCarbon / 1000;
          } else if (q.label === 'nbTshirt') {
            this.achatChartData.datasets[0].data[1] = q.totalCarbon / 1000;
          } else if (q.label === 'nbFourniture') {
            this.achatChartData.datasets[0].data[2] = q.totalCarbon / 1000;
          } else if (q.label === 'prixConseils') {
            this.achatChartData.datasets[0].data[3] = q.totalCarbon / 1000;
          } else if (q.label === 'donsAsso') {
            this.achatChartData.datasets[0].data[4] = q.totalCarbon / 1000;
          } else if (q.label === 'prixComService') {
            this.achatChartData.datasets[0].data[5] = q.totalCarbon / 1000;
          } else if (q.label === 'papier') {
            this.achatChartData.datasets[0].data[6] = q.totalCarbon / 1000;
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

  // Ajout or Create Group

  // public groupForm: any = new FormGroup({
  //   email: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required]),
  // });
  // groupExports!: GroupExport[];

  // ngOnInit(): void {
  //   console.log(window.localStorage.getItem('userId'))
  //   if (window.localStorage.getItem('userId'))
  // }

  // getAllGroupData() {
  //   this.group.map((any) => {
  //     if (b.terminated == true) {
  //       this.push(new Date().toDateString());
  //     }
  //   });
  // }

  // getAllGroup() {
  //   this.groupService.getAllGroup().subscribe((data: any) => {
  //     if (data.status === true) {
  //       console.log(data);
  //       this.group = data.group;
  //     }
  //   });
  // }

  // getGroup() {
  //   this.groupService.getAllGroup().subscribe((data: any) => {
  //     if (data.status === true) {
  //       console.log(data);
  //       this.group = data.group;
  //     }
  //   });
  // }

  // createGroup() {
  //   this.groupService.getAllGroup().subscribe((data: any) => {
  //     if (data.status === true) {
  //       console.log(data);
  //       this.group = data.group;
  //     }
  //   });
  // }

  // joinGroup() {
  //   this.groupService.getAllGroup().subscribe((data: any) => {
  //     if (data.status === true) {
  //       console.log(data);
  //       this.group = data.group;
  //     }
  //   });

  //   // button.addEventListener('click', () => this.join);
  // }

  // exitGroup() {
  //   this.groupService.getAllGroup().subscribe((data: any) => {
  //     if (data.status === true) {
  //       console.log(data);
  //       this.group = data.group;
  //     }
  //   });
  // }

  // public get group(): FormArray {
  //   return this.groupForm.get('group') as FormArray;
  // }

  // public addGroup(): void {
  //   this.group.push(new FormControl());
  // }

  // onCreate() {
  //   const form = this.groupForm.getRawValue();
  //   this.authService.signin(form).subscribe((data) => {
  //     if (data.status == true) {
  //       this.userService.saveToken(data.accessToken);
  //       this.userService.saveRefreshToken(data.refreshToken);
  //       this.userService.saveUser(data.userId);
  //       window.location.reload();
  //     }
  //     console.log(this.groupForm);
  //     console.log(data);
  //   });
  // }
}
