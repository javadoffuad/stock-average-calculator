import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {IInstrument, IInstrumentResponse} from '../../models/instrument.models';
import {forkJoin, Observable, take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  private serviceUrl = `${API_URL}.InstrumentsService/`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private instrument = signal<IInstrument | null>(null);
  private instruments = signal<Record<string, IInstrument | null>>({});
  public selectInstrument = computed(() => this.instrument());

  constructor() { }

  public loadInstrumentBy(id: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''){
    this.http.post<IInstrumentResponse>(
      `${this.serviceUrl}ShareBy`,
      {
        idType,
        id,
        classCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getAccessToken()}`,
        }
      }
    ).pipe(take(1)).subscribe(response => this.instrument.set(response.instrument));
  }

  public loadInstrumentsBy(ids: string[]): void{
    if (!ids.length) {
      return;
    }
    const requests$ = ids.map(id => this.loadShare(id));

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

  public selectInstrumentById(instrumentId: string): IInstrument | null {
    return this.instruments()[instrumentId] || null;
  }

  private loadShare(id: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''): Observable<IInstrumentResponse> {
    return this.http.post<IInstrumentResponse>(
      `${this.serviceUrl}ShareBy`,
      {
        idType,
        id,
        classCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getAccessToken()}`,
        }
      }
    );
  }
}
