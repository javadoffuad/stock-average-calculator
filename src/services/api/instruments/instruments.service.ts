import { inject, Injectable} from '@angular/core';
import {API_URL} from '../../../constants/api.constants';
import {HttpClient} from '@angular/common/http';
import { IInstrumentResponse} from '../../../models/instrument.models';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  private http = inject(HttpClient);

  private readonly serviceUrl = `${API_URL}.InstrumentsService/`;

  public loadShareBy(instrumentId: string, idType= 'INSTRUMENT_ID_TYPE_UID', classCode = ''): Observable<IInstrumentResponse>{
    return this.http.post<IInstrumentResponse>(
      `${this.serviceUrl}ShareBy`,
      {
        idType,
        id: instrumentId,
        classCode,
      },
    );
  }
}
