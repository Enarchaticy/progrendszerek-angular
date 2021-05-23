import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(environment.springApiUrl + 'transactions');
  }

  getById(id) {
    return this.http.get(environment.springApiUrl + 'transaction?id=' + id, {
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }

  post(transaction) {
    return this.http.post(environment.springApiUrl + 'transaction', transaction, {
      responseType: 'json',
      observe: 'response' as 'response',
    });
  }
}
