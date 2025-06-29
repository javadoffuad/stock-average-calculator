import {inject, Injectable, Signal} from '@angular/core';
import {StoreOperationsService} from './store-operations.service';
import {IPosition} from '../models/operation.models';

@Injectable({
  providedIn: 'root'
})
export class FacadeOperationsService {
  private storeOperationsService = inject(StoreOperationsService);

  constructor() { }

  loadPortfolio(accountId: string): void {
    this.storeOperationsService.loadPortfolio(accountId);
  }

  selectPositions(): Signal<IPosition[] | undefined> {
    return this.storeOperationsService.selectPositions;
  }

  selectIsLoading(): Signal<boolean> {
    return this.storeOperationsService.selectIsLoading;
  }
}
