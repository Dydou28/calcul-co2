import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CalculettePersoComponent } from './calculette-perso/calculette-perso.component';
import { ContactComponent } from './contact/contact.component';
import { HomeCardListComponent } from './home-card-list/home-card-list.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { QuestionnaireEcoComponent } from './questionnaire-eco/questionnaire-eco.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SourcesComponent } from './sources/sources.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './_services/auth-guard';

const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'verify_email/:email/:rand', component: VerifyEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  { path: 'homeCards',
    canActivate: [AuthGuard],
    component: HomeCardListComponent },
  {
    path: '',
    loadChildren: () =>
      import('./calculette-perso/calculette-perso.module').then((m) => m.CalculettePersoModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./calculette-entity/calculette-entity.module').then((m) => m.CalculetteEntityModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./calculette-entreprise/calculette-entreprise.module').then((m) => m.CalculetteEntrepriseModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./calculette-others/calculette-others.module').then((m) => m.CalculetteOthersModule),
  },
  {
    path: 'questionnaire-eco', 
    canActivate: [AuthGuard],
    component:QuestionnaireEcoComponent
  },
  {
    path: 'sources', 
    canActivate: [AuthGuard],
    component: SourcesComponent
  },
  {
    path: 'contact',
    canActivate: [AuthGuard],
    component: ContactComponent
  },
  {
    path: 'profil', 
    canActivate: [AuthGuard],
    component: ProfilComponent
  },
  {
    path: 'admin', 
    canActivate: [AuthGuard],
    component: AdminComponent 
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
