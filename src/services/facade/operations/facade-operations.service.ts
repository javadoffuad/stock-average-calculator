import {inject, Injectable, Signal} from '@angular/core';
import {StoreOperationsService} from '../../store';
import {IPortfolio, IPosition} from '../../../models/operation.models';

@Injectable({
  providedIn: 'root'
})
export class FacadeOperationsService {
  private storeOperationsService = inject(StoreOperationsService);

  public loadPortfolio(accountId: string): void {
    this.storeOperationsService.loadPortfolio(accountId);
  }

  public selectPortfolio(): Signal<IPortfolio | null> {
    return this.storeOperationsService.selectPortfolio;
  }

  public selectPositions(): Signal<IPosition[] | undefined> {
    return this.storeOperationsService.selectPositions;
  }

  public selectPositionBy(ticker: string): Signal<IPosition | null> {
    return this.storeOperationsService.selectPositionBy(ticker);
  }

  public selectIsLoading(): Signal<boolean> {
    return this.storeOperationsService.selectIsLoading;
  }
}
