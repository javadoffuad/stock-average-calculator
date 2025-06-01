import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {ACCESS_TOKEN} from '../tokens/acces.tokens';
import {IPortfolio} from '../models/operation.models';

type Currency = 'RUB' | 'USD' | 'EUR';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private serviceUrl = `${API_URL}.OperationsService/`;
  private http = inject(HttpClient);
  private token = inject(ACCESS_TOKEN);
  private portfolio = signal<IPortfolio | null>(null);
  public selectPortfolio = computed(() => this.portfolio());

  constructor() { }

  loadPortfolio(accountId: string, currency: Currency = 'RUB'){
    this.http.post<IPortfolio>(
      `${this.serviceUrl}GetPortfolio`,
      {
        accountId,
        currency
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        }
      }
    ).subscribe(response => this.portfolio.set(response));
  }
}
