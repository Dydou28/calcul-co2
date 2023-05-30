import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken() {
    throw new Error('Method not implemented.');
  }
  constructor(public http: HttpClient) {}

  signup(form: any): Observable<any> {
    return this.http.post(
      environment.AUTH_API + 'user/register',
      {
        username: form.username,
        email: form.email,
        password: form.password,
        last_name: form.last_name,
        first_name: form.last_name,
      },
      httpOptions
    );
  }

  signin(form: any): Observable<any> {
    return this.http.post(
      environment.AUTH_API + 'user/authenticate',
      {
        email: form.email,
        password: form.password,
      },
      httpOptions
    );
  }
}
