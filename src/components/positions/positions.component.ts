import {Component, computed, input} from '@angular/core';
import {IPosition} from '../../models/operation.models';
import {PositionItemComponent} from '../position-item/position-item.component';

@Component({
  selector: 'app-positions',
  imports: [
    PositionItemComponent
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  public positions = input.required<IPosition[]>();
  protected positionShares = computed(() => this.positions().filter(p => p.instrumentType === 'share'))
  protected positionCurrencies = computed(() => this.positions().filter(p => p.instrumentType === 'currency'))
}
