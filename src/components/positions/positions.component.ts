import {Component, computed, inject, Signal} from '@angular/core';
import {PositionItemComponent} from '../position-item/position-item.component';
import {FacadeOperationsService, FacadeInstrumentsService} from '../../services/facade';
import {TuiTitle} from "@taiga-ui/core";
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
  private readonly facadeInstrumentsService = inject(FacadeInstrumentsService);

  protected positions = this.facadeOperationsService.selectPositions();
  protected positionShares: Signal<IPosition[]> = computed(() => this.positions()?.filter(p => p.instrumentType === 'share') || [])
  protected instruments = this.facadeInstrumentsService.selectInstruments;

  constructor() {}
}
