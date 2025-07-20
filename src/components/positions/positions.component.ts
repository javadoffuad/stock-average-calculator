import {Component, computed, inject, Signal} from '@angular/core';
import {PositionItemComponent} from '../position-item/position-item.component';
import {FacadeOperationsService} from '../../services/facade-operations.service';
import {TuiTitle} from "@taiga-ui/core";
import {InstrumentsService} from '../../services/instruments/instruments.service';
import {IPosition} from '../../models/operation.models';
import {FindInstrumentPipe} from '../../pipes/find-instrument.pipe';

@Component({
  selector: 'app-positions',
    imports: [
      PositionItemComponent,
      FindInstrumentPipe,
      TuiTitle
    ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  private readonly facadeOperationsService = inject(FacadeOperationsService);
  private readonly instrumentsService = inject(InstrumentsService);

  protected positions = this.facadeOperationsService.selectPositions();
  protected positionShares: Signal<IPosition[]> = computed(() => this.positions()?.filter(p => p.instrumentType === 'share') || [])
  protected instruments = this.instrumentsService.selectInstruments;

  constructor() {}
}
