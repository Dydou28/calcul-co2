import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public emailVerif = false;
  public hide = true;
  public errorResponse = '';
  public msg = "";

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    console.log(window.localStorage.getItem('userId'))
    if (window.localStorage.getItem('userId')) {
      this.router.navigate(['/home']);
    }
  }

  changeHideVisi() {
    if (this.hide === true)
      this.hide = false;
    else
      this.hide = true;
  }

  onSubmit() {
    const form = this.loginForm.getRawValue();
    this.authService
      .signin(form)
      .subscribe(
        (data) => {
          if (data.status == true) {
            this.userService.saveToken(data.accessToken);
            this.userService.saveRefreshToken(data.refreshToken);
            this.userService.saveUser(data.userId);
            window.location.reload();
            this.msg = "";
          } else {
            if ( data.message === 'Invalid Password!') {
              this.errorResponse = "Mot de passe invalide";
              this.msg = "";
            } else if ( data.message === 'Your email was not verified') {
              this.errorResponse = "Votre email n'est pas vérifié";
              this.emailVerif = true;
              this.msg = "";
            } else {
              this.errorResponse = data.message;
              this.msg = "";
            }
          }
        },
        (err) => {
          if ( err.error.message === 'Too Many Attempts try it 10mn later') {
            this.errorResponse = "Vous devez attendre 10mn pour réessayer de vous connecter car vous avez fait trop de tentative";
            this.msg = "";
          }
        }
      );
  }

  sendVerifyEmail() {
    const form = this.loginForm.getRawValue();
    if (form.email == "") {
      this.errorResponse = "Veuillez remplir le champs email pour envoyer un mail de verification d'adresse mail";
    } else {
      this.userService
        .sendVerifyEmail(form.email)
        .subscribe(
          (data) => {
            this.emailVerif = false;
            this.msg = 'un mail vient d\'être envoyé';
            this.errorResponse = "";
          },
          (err) => {
            this.msg = "";
          }
        );
    }
  }
}
