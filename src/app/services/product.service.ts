import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  get(): Observable<unknown> {
    return this.http.get(environment.expressApiUrl + 'product', {
      withCredentials: true,
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }

  post(product): Observable<unknown> {
    return this.http.post(environment.expressApiUrl + 'product', product, {
      withCredentials: true,
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }

  put(product): Observable<unknown> {
    return this.http.put(environment.expressApiUrl + 'product', product, {
      withCredentials: true,
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }

  getAllSpring() {
    return this.http.get(environment.springApiUrl + 'productions');
  }

  getByIdSpring(id) {
    return this.http.get(environment.springApiUrl + 'production?id=' + id, {
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }

  postSpring(production) {
    return this.http.post(environment.springApiUrl + 'production', production, {
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }
}
