import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {IPortfolio} from '../models/operation.models';

type Currency = 'RUB' | 'USD' | 'EUR';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private serviceUrl = `${API_URL}.OperationsService/`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);
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
          'Authorization': `Bearer ${this.authService.getAccessToken()}`,
        }
      }
    ).subscribe(response => this.portfolio.set(response));
  }
}
