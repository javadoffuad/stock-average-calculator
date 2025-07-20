import { inject, Injectable, Signal} from '@angular/core';
import {StoreOperationsService} from '../../store';
import { IPosition } from '../../../models/operation.models';

@Injectable({
  providedIn: 'root'
})
export class FacadeOperationsService {
  private storeOperationsService = inject(StoreOperationsService);

  public selectPortfolio = this.storeOperationsService.selectPortfolio;
  public selectPositions = this.storeOperationsService.selectPositions;

  public selectPositionBy(ticker: string): Signal<IPosition | null> {
    return this.storeOperationsService.selectPositionBy(ticker);
  }

  public loadPortfolio(accountId: string): void {
    this.storeOperationsService.loadPortfolio(accountId);
  }
}
