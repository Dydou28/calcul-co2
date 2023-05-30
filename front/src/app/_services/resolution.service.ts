import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ResolutionService {
  private newResolutionSubject = new Subject<any>();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //private readonly baseUrl = 'http://localhost:3000';

  constructor(public http: HttpClient, private authService: AuthService) {}

  createResolution(userId: string, resolution: any): Observable<any> {
    //this.newResolutionSubject.next(resolution);
    return this.http.post(
      environment.AUTH_API + `user/${userId}/resolution`,
      {
        label: resolution,
      },
      httpOptions
    );
  }
  readResolution(userId: any): Observable<any> {
    return this.http.get(
      environment.AUTH_API + `user/${userId}/resolution`,
      httpOptions
    );
  }

  deleteResolution(resolutionId: string) {
    return this.http.delete(
      environment.AUTH_API + `user/${resolutionId}/resolution`,
      httpOptions
    );
  }

  valideResolution(resolutionId: string, validate: boolean): Observable<any> {
    console.log(validate);
    return this.http.patch(
      environment.AUTH_API + `user/${resolutionId}/resolution/valideResolution`,
      { state: validate }
    );
  }
  onNewResolution() {
    return this.newResolutionSubject.asObservable();
  }
}
