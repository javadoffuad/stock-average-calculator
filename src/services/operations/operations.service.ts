import { inject, Injectable } from '@angular/core';
import {API_URL} from '../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {IPortfolio} from '../../models/operation.models';
import {Observable} from 'rxjs';

type Currency = 'RUB' | 'USD' | 'EUR';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private readonly http = inject(HttpClient);

  private readonly serviceUrl = `${API_URL}.OperationsService/`;

  constructor() { }

  public loadPortfolio(accountId: string, currency: Currency = 'RUB'): Observable<IPortfolio> {
    return this.http.post<IPortfolio>(
      `${this.serviceUrl}GetPortfolio`,
      {
        accountId,
        currency
      },
    );
  }
}
