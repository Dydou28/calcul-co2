import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

function ValidatorPass(control: FormControl) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
  if (!re.test(String(control.value).toLowerCase())) {
    return {
      error:
        'le mot de passe doit comporter minimum 12 caractères, un chiffre et un caractère spéciale',
    };
  }
  return {};
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public emailSend = false;
  public errorSend = "";

  public errorPass = '';
  public infoPass = '';

  public emailForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  public passForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    rand: new FormControl('', [Validators.required]),
    newPassword1: new FormControl('', [Validators.required, ValidatorPass]),
    newPassword2: new FormControl('', [Validators.required, ValidatorPass]),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let form = this.emailForm.getRawValue();
    this.userService
      .sendResetPassword(form.email)
      .subscribe(
        (data) => {
          console.log(data);
          this.emailSend = true;
        },
        (err) => {
          console.log(err);
          this.errorSend = err.error.message;
        }
      );
  }

  changePassword() {
    let form = this.passForm.getRawValue();
    console.log(form)
    if (form.newPassword1 !== form.newPassword2) {
      console.log(form)
      this.errorPass = "les deux mot de passe ne correspondent pas."
      this.infoPass = "";
    } else {
      this.userService
        .resetPassword(form.email, form.newPassword1, form.rand)
        .subscribe(
          (data) => {
            console.log(data)
            this.infoPass = "Votre mot de passe vient d'être modifié !";
            this.errorPass = ""
          },
          (err) => {
            console.log(err)
            if (err.error.message === "user doesn't exist"){
              this.errorPass = "L'adresse mail ne correspond à aucun compte."
              this.infoPass = "";
            } else if (err.error.message === "wrong token"){
              this.errorPass = "Le code entré n'est pas valide."
              this.infoPass = "";
            } else if (err.error.message === "wrong number of request, a new mail was send with a new code"){
              this.errorPass = "Le nombre d'essai autorisé vient d'être dépassé, vous aller recevoir un nouveau code par mail."
              this.infoPass = "";
            } else if (err.error.message === "Wrong password format"){
              this.errorPass = "Le format du mot de passe ne correspond pas."
              this.infoPass = "";
            } else if (err.error.message === "Code expired, a new mail was send with a new code"){
              this.errorPass = "Le code est expiré, vous allez en recevoir un nouveau par mail."
              this.infoPass = "";
            } else if (err.error.message === "no token"){
              this.errorPass = "Il faut demandé un code avant de pouvoir changer son mot de passe."
              this.infoPass = "";
            }
          }
        );
    }
  }

  alreadyHaveCode() {
    this.emailSend = !this.emailSend;
  }

}
