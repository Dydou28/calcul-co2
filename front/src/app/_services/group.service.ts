import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(public http: HttpClient) {}

  getAllGroup() {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(
      environment.AUTH_API + 'user/' + userId + '/groupe',
      httpOptions
    );
  }

  getGroup(currentGroupe: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(
      environment.AUTH_API + 'user/' + userId + '/groupe' + currentGroupe,
      httpOptions
    );
  }

  createGroup() {
    const userId = window.localStorage.getItem('userId');
    return this.http.post(
      environment.AUTH_API + 'user/' + userId + '/groupe',
      httpOptions
    );
  }

  joinGroup(groupeId: any, joinGroupe: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.post(
      environment.AUTH_API +
        'user/' +
        userId +
        '/groupe' +
        groupeId +
        joinGroupe,
      httpOptions
    );
  }

  exitGroup(exitGroupe: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.delete(
      environment.AUTH_API + 'user/' + userId + '/groupe' + exitGroupe,
      httpOptions
    );
  }
}
