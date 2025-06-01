import {inject, Injectable, Signal, signal} from '@angular/core';
import {API_URL} from '../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {ACCESS_TOKEN} from '../tokens/acces.tokens';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serviceUrl = `${API_URL}.UsersService/`;
  private http = inject(HttpClient);
  private token = inject(ACCESS_TOKEN);
  private accounts = signal<Object | null>(null);

  constructor() { }

  loadAccounts(){
    this.http.post(
      `${this.serviceUrl}GetAccounts`,
      {
        "status": "ACCOUNT_STATUS_UNSPECIFIED"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        }
      }
    ).subscribe(accounts => this.accounts.set(accounts));
  }

  selectAccounts(): Signal<Object | null> {
    return this.accounts;
  }
}
