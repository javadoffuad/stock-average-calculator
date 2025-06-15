import {Component, computed, inject} from '@angular/core';
import {PositionItemComponent} from '../position-item/position-item.component';
import {OperationsService} from '../../services/operations.service';
import {TuiTitle} from "@taiga-ui/core";

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

  protected portfolio = this.operationsService.selectPortfolio;
  protected positions = computed(() => this.portfolio()?.positions);
  protected positionShares = computed(() => this.positions()?.filter(p => p.instrumentType === 'share'))
}
