import {computed, inject, Injectable, signal} from '@angular/core';
import {API_URL} from '../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {IInstrument, IInstrumentResponse} from '../../models/instrument.models';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  private serviceUrl = `${API_URL}.InstrumentsService/`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private instrument = signal<IInstrument | null>(null);
  public selectInstrument = computed(() => this.instrument());

  constructor() { }

  loadInstrumentBy(id: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''){
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
    ).subscribe(response => this.instrument.set(response.instrument));
  }
}
