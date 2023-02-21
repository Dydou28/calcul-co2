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
export class SourcesService {

  constructor(private http: HttpClient){}

  importFile(indices: any) {
    const userId = window.localStorage.getItem('userId');
    return this.http.post(environment.AUTH_API + 'user/' + userId + '/sources/file/excel',{
        indices
      },
      httpOptions
    );
  }

  allIndices() {
    const userId = window.localStorage.getItem('userId');
    return this.http.get(environment.AUTH_API + 'user/' + userId + '/sources',
      httpOptions
    );
  }

}
