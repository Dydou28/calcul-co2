import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public hide = true;
  public hide2 = true;
  public errorResponse = '';

  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, ValidatorPass]),
    password2: new FormControl('', [Validators.required, ValidatorPass]),
  });

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  changeHideVisi() {
    if (this.hide === true)
      this.hide = false;
    else
      this.hide = true;
  }

  changeHideVisi2() {
    if (this.hide2 === true)
      this.hide2 = false;
    else
      this.hide2 = true;
  }

  onSubmit() {
    const form = this.registerForm.getRawValue();
    if (form.password !== form.password2) {
      this.errorResponse = 'les mots de passe ne correspondent pas';
    } else {
      this.authService
        .signup(form)
        .subscribe(
          (data) => {
            // console.log(data);
            this.errorResponse = '';
            this.router.navigate(['/login']);
          },
          (err) => {
            this.errorResponse = err.error.message;
          }
        );
    }
  }

}
