import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupeService {
  //private readonly baseUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private readonly baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  createGroupe(groupName: string, userId: any): Observable<any> {
    return this.http.post(
      environment.AUTH_API + 'user/' + userId + '/groupe',
      {
        name: groupName,
      },
      this.httpOptions
    );
  }

  getAllGroupes(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + `user/${userId}/groupe`);
  }
  joinGroupe(userId: string, groupeId: string): Observable<any> {
    return this.http.patch<any>(
      environment.AUTH_API + `user/${userId}/groupe/${groupeId}/joinGroupe`,
      {}
    );
  }
  exitGroupe(userId: string): Observable<any> {
    return this.http.patch<any>(
      environment.AUTH_API + `user/${userId}/groupe/exitGroupe`,
      {}
    );
  }

  getGroupe(userId: any): Observable<any> {
    return this.http.get(environment.AUTH_API + `user/${userId}/groupe`);
  }
  getCurrentGroupe(userId: any): Observable<any> {
    return this.http.get(
      environment.AUTH_API + `user/${userId}/groupe/currentGroupe`
    );
  }
}
