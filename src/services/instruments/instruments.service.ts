import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {API_URL} from '../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {IInstrument, IInstrumentResponse} from '../../models/instrument.models';
import {forkJoin, Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  private http = inject(HttpClient);

  private readonly serviceUrl = `${API_URL}.InstrumentsService/`;
  private instruments = signal<Record<string, IInstrument | null>>({});
  public selectInstruments: Signal<IInstrument[]> = computed(() => {
    return Object.values(this.instruments()).filter(instrument => !!instrument);
  });

  constructor() { }

  public selectInstrumentBy(instrumentId: string){
    return this.instruments()[instrumentId];
  }

  public loadShareBy(instrumentId: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''){
    if (!instrumentId) {
      return;
    }

    this.http.post<IInstrumentResponse>(
      `${this.serviceUrl}ShareBy`,
      {
        idType,
        id: instrumentId,
        classCode,
      },
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

    const requests$ = unloadedInstrumentIds.map(id => this.loadShare(id));

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

  private loadShare(id: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''): Observable<IInstrumentResponse> {
    return this.http.post<IInstrumentResponse>(
      `${this.serviceUrl}ShareBy`,
      {
        idType,
        id,
        classCode,
      },
    );
  }
}
