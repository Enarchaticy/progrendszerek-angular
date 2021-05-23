import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user): Observable<unknown> {
    return this.http.post(environment.expressApiUrl + 'user', user, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response' as 'response',
    });
  }

  login(user): Observable<unknown> {
    return this.http.post(environment.expressApiUrl + 'login', user, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response' as 'response',
    });
  }

  status(): Observable<unknown> {
    return this.http.get(environment.expressApiUrl + 'status', {
      withCredentials: true,
      responseType: 'text',
      observe: 'response' as 'response',
    });
  }

  logout(): Observable<unknown> {
    return this.http.post(environment.expressApiUrl + 'logout', {
      withCredentials: true,
      responseType: 'text',
      observe: 'response' as 'response',
    });
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
}
