import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public email: any = "";
  public rand: any = "";
  public emailVerified: Boolean = false;
  public sendEmailVerif: any = "";

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.rand = this.route.snapshot.paramMap.get('rand');
    this.userService.verifyEmail(this.email, this.rand).subscribe((data: any) => {
      if (data['status'] === true) {
        this.emailVerified = true;
      } else {
        this.emailVerified = false;
      }
    })
  }

  sendVerifyEmail() {
    this.userService.sendVerifyEmail(this.email).subscribe((data: any) => {
      console.log(data);
      if (data['status'] === true) {
        this.sendEmailVerif = 'Un email vient d\'être envoyé !';
      }
    })
  }

}
