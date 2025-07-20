import {computed, inject, Injectable, Signal} from '@angular/core';
import {IInstrument} from '../../../models/instrument.models';
import {StoreInstrumentsService} from '../../store/instruments/store-instruments.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeInstrumentsService {
  private storeInstrumentsService = inject(StoreInstrumentsService);

  public selectInstruments: Signal<IInstrument[]> = this.storeInstrumentsService.selectInstruments;

  public selectInstrumentBy(instrumentId: string){
    return this.storeInstrumentsService.selectInstrumentBy(instrumentId);
  }

  public loadShareBy(instrumentId: string): void {
    this.storeInstrumentsService.loadShareBy(instrumentId);
  }

  public loadSharesBy(instrumentIds: string[]): void {
    this.storeInstrumentsService.loadSharesBy(instrumentIds);
  }
}
