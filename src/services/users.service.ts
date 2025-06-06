import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {ACCESS_TOKEN} from '../tokens/acces.tokens';
import {IAccount, IGetAccountsResponse} from '../models/account.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serviceUrl = `${API_URL}.UsersService/`;
  private http = inject(HttpClient);
  private token = inject(ACCESS_TOKEN);
  private accounts = signal<IAccount[]>([]);
  public currentAccount = computed(() => this.accounts().length ? this.accounts()[0] : null);

  constructor() { }

  loadAccounts(): void{
    this.http.post<IGetAccountsResponse>(
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
    ).subscribe(response => this.accounts.set(response.accounts));
  }
}
