import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  saveUser(userId: string) {
    window.localStorage.removeItem('userId');
    window.localStorage.setItem('userId', userId);
    this.getUser(userId).subscribe((data) => {
      window.localStorage.removeItem('user');
      window.localStorage.setItem('user', JSON.stringify(data));
    })
  }

  getUser(userId: any): Observable<any> {
    return this.http.get(environment.AUTH_API + `user/${userId}`, httpOptions);
  }

  getLocalUser(): any {
    const user = window.localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return {
        _id: '',
        username: '',
        email: '',
        last_name: '',
        first_name: '',
      };
    }
  }

  saveToken(accessToken: string) {
    window.localStorage.removeItem('accessToken');
    window.localStorage.setItem('accessToken', accessToken);
  }

  saveRefreshToken(refreshToken: string) {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.setItem('refreshToken', refreshToken);
  }

  getToken(): string | null {
    return window.localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return window.localStorage.getItem('refreshToken');
  }

  checkToken(): Observable<any> {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + `user/${userId}/token`, {
      responseType: 'text',
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = window.localStorage.getItem('refreshToken');
    return this.http.post(environment.AUTH_API + 'user/refreshtoken',{
        refreshToken
      },
      httpOptions
    );
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  verifyEmail(email: any, rand: any) {
    return this.http.get(environment.AUTH_API + `user/verifyEmail/${email}/${rand}`, httpOptions);
  }

  sendVerifyEmail(email: any) {
    return this.http.post(environment.AUTH_API + 'user/verifyEmail',{
        email
      },
      httpOptions
    );
  }

  sendGuardConsent(userId: any, guardId: any) {
    return this.http.get(environment.AUTH_API + `user/${userId}/guard/${guardId}/accepte`,
      httpOptions
    );
  }

  editUser(user: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.patch(environment.AUTH_API + 'user/' + userId, user,
      httpOptions
    );
  }

  changePassword(oldPassword: any, newPassword: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.put(environment.AUTH_API + 'user/' + userId + '/password', {
      oldPassword,
      newPassword
    }, httpOptions
    );
  }

  sendResetPassword(email: any) {
    return this.http.put(environment.AUTH_API + 'user/password', {
      email
    }, httpOptions);
  }

  resetPassword(email: any, password: any, rand: any) {
    return this.http.patch(environment.AUTH_API + 'user/password', {
      email,
      password,
      rand
    }, httpOptions);
  }
}
