import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {IPortfolio, IPosition} from '../../../models/operation.models';
import {OperationsService} from "../../api";
import {take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreOperationsService {
  private operationsService = inject(OperationsService);

  private portfolio = signal<IPortfolio | null>(null);
  private isLoading = signal<Record<string, boolean>>({});

  public selectPortfolio = computed(() => this.portfolio());
  public selectPositions = computed(() => this.portfolio()?.positions);
  public selectPositionBy = (ticker: string): Signal<IPosition | null> => computed(() => {
    return this.selectPositions()?.find(p => p.ticker === ticker) ?? null
  });

  public loadPortfolio(accountId: string): void {
    this.isLoading.set({[accountId]: true});

    this.operationsService.loadPortfolio(accountId).pipe(
      take(1)
    ).subscribe({
      error: () => {
        this.isLoading.set({[accountId]: false});
      },
      next: (response: IPortfolio) => {
        this.portfolio.set(response);
        this.isLoading.set({[accountId]: false});
      }
    })
  }
}
