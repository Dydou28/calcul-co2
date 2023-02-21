import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})

export class CalculetteEntity {

  constructor(public http: HttpClient) { }

  getAllAgence() {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + 'user/'+userId+'/calculetteEntity/',
      httpOptions
    );
  }
}
