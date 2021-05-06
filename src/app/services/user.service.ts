import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user): Observable<unknown> {
    return this.http.post('http://localhost:8080/user', user, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response' as 'response',
    });
  }

  login(user): Observable<unknown> {
    return this.http.post('http://localhost:8080/login', user, {
      withCredentials: true,
      responseType: 'text',
      observe: 'response' as 'response',
    });
  }

  logout(): Observable<unknown> {
    return this.http.post('http://localhost:8080/logout', {
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
