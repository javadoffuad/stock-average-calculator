import {inject, Injectable} from '@angular/core';
import {API_URL} from '../../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {IAccount, IGetAccountsResponse, IInfo} from '../../../models/account.models';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serviceUrl = `${API_URL}.UsersService/`;
  private http = inject(HttpClient);

  public loadAccounts(): Observable<IAccount[]> {
    return this.http.post<IGetAccountsResponse>(
      `${this.serviceUrl}GetAccounts`,
      {
        "status": "ACCOUNT_STATUS_UNSPECIFIED"
      },
    ).pipe(map(response => response.accounts));
  }

  public getInfo(): Observable<IInfo> {
    return this.http.post<IInfo>(
      `${this.serviceUrl}GetInfo`,
      {},
    );
  }
}
