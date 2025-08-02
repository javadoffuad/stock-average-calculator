import { inject, Injectable, Signal} from '@angular/core';
import {IAsset, IInstrument} from '../../../models/instrument.models';
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

  public selectActiveAsset(): Signal<IAsset | null> {
    return this.storeInstrumentsService.selectActiveAsset;
  }

  public loadAssetBy(assetId: string): void {
    this.storeInstrumentsService.loadAssetBy(assetId);
  }

  public loadShareBy(instrumentId: string): void {
    this.storeInstrumentsService.loadShareBy(instrumentId);
  }

  public loadSharesBy(instrumentIds: string[]): void {
    this.storeInstrumentsService.loadSharesBy(instrumentIds);
  }
}
