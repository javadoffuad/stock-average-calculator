import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {IAccount, IGetAccountsResponse} from '../models/account.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serviceUrl = `${API_URL}.UsersService/`;
  private http = inject(HttpClient);
  private accounts = signal<IAccount[]>([]);
  public currentAccount = computed(() => this.accounts().length ? this.accounts()[0] : null);

  constructor() { }

  loadAccounts(): void{
    this.http.post<IGetAccountsResponse>(
      `${this.serviceUrl}GetAccounts`,
      {
        "status": "ACCOUNT_STATUS_UNSPECIFIED"
      },
    ).subscribe(response => this.accounts.set(response.accounts));
  }
}
