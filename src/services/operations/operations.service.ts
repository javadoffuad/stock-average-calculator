import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {IPortfolio} from '../../models/operation.models';

type Currency = 'RUB' | 'USD' | 'EUR';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private http = inject(HttpClient);

  private readonly serviceUrl = `${API_URL}.OperationsService/`;
  private portfolio = signal<IPortfolio | null>(null);

  public selectPortfolio = computed(() => this.portfolio());
  public selectPositionBy = (ticker: string) => computed(() => {
    return this.portfolio()?.positions.find(p => p.ticker === ticker) ?? null
  });

  constructor() { }

  public loadPortfolio(accountId: string, currency: Currency = 'RUB'){
    this.http.post<IPortfolio>(
      `${this.serviceUrl}GetPortfolio`,
      {
        accountId,
        currency
      },
    ).subscribe(response => this.portfolio.set(response));
  }
}
