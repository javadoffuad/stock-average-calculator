import {Component, computed, effect, inject} from '@angular/core';
import {PositionItemComponent} from '../position-item/position-item.component';
import {OperationsService} from '../../services/operations.service';
import {TuiTitle} from "@taiga-ui/core";
import {InstrumentsService} from '../../services/instruments/instruments.service';

@Component({
  selector: 'app-positions',
    imports: [
      PositionItemComponent,
      TuiTitle
    ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  private readonly operationsService = inject(OperationsService);
  private readonly instrumentsService = inject(InstrumentsService);

  protected portfolio = this.operationsService.selectPortfolio;
  protected positions = computed(() => this.portfolio()?.positions);
  protected positionShares = computed(() => this.positions()?.filter(p => p.instrumentType === 'share') || [])

  constructor() {
    effect(() => {
      const positionShareIds = this.positionShares().map(p => p.instrumentUid);

      if (positionShareIds.length > 0) {
        this.instrumentsService.loadInstrumentsBy(positionShareIds);
      }
    });
  }
}
