import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {IAsset, IInstrument} from '../../../models/instrument.models';
import {forkJoin, take} from 'rxjs';
import {InstrumentsService} from '../../api';

@Injectable({
  providedIn: 'root'
})
export class StoreInstrumentsService {
  private instrumentsService = inject(InstrumentsService);

  private instruments = signal<Record<string, IInstrument | null>>({});
  private selectedAssetId = signal<string | null>(null);
  private assets = signal<Record<string, IAsset | null>>({});
  public selectInstruments: Signal<IInstrument[]> = computed(() => {
    return Object.values(this.instruments()).filter(instrument => !!instrument);
  });
  public selectActiveAsset = computed(() => {
    const assetId = this.selectedAssetId();
    return assetId ? this.assets()[assetId] ?? null : null;
  });

  public selectInstrumentBy(instrumentId: string){
    return this.instruments()[instrumentId];
  }

  public loadShareBy(instrumentId: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''): void {
    if (!instrumentId) {
      return;
    }

    this.instrumentsService.loadShareBy(
      instrumentId,
      idType,
      classCode
    ).pipe(take(1)).subscribe(response => {
      this.instruments.update(currentInstruments => ({
        ...currentInstruments,
        [response.instrument.uid]: response.instrument,
      }));
    });
  }

  public loadSharesBy(instrumentIds: string[]): void {
    if (!instrumentIds.length) {
      return;
    }

    const loadedInstrumentIds = this.selectInstruments().map(({uid}) => uid);
    const unloadedInstrumentIds = instrumentIds.filter(id => !loadedInstrumentIds.includes(id));

    const requests$ = unloadedInstrumentIds.map(id => this.instrumentsService.loadShareBy(id));

    forkJoin(requests$).pipe(take(1)).subscribe(responses => {
      const newInstruments: Record<string, IInstrument> = {};
      for (const {instrument} of responses) {
        newInstruments[instrument.uid] = instrument;
      }

      this.instruments.update(currentInstruments => ({
        ...currentInstruments,
        ...newInstruments,
      }));
    });
  }

  public loadAssetBy(assetId: string): void {
    if (!assetId) {
      return;
    }

    this.selectedAssetId.set(assetId);

    this.instrumentsService.loadAssetBy(assetId).pipe(take(1)).subscribe(response => {
      this.assets.update(assets => ({
        ...assets,
        [assetId]: response.asset,
      }));
    });
  }
}
