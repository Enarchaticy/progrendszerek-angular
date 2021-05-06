import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  get(): Observable<unknown> {
    return this.http.get('http://localhost:8080/product', {
      withCredentials: true,
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }
}
