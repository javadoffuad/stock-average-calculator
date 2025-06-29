import { Pipe, PipeTransform } from '@angular/core';
import {IInstrument} from '../models/instrument.models';
import {IPosition} from '../models/operation.models';

@Pipe({
  name: 'findInstrument'
})
export class FindInstrumentPipe implements PipeTransform {

  transform(position: IPosition, instruments: IInstrument[]): IInstrument | undefined {
    return instruments.find(instrument => instrument.uid === position.instrumentUid);
  }

}
