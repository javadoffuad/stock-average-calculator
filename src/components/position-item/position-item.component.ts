import {Component, input} from '@angular/core';
import {IPosition} from '../../models/operation.models';
import {combinePrice} from '../../utils/currency.utils';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-position-item',
  imports: [
    RouterLink
  ],
  templateUrl: './position-item.component.html',
  styleUrl: './position-item.component.css'
})
export class PositionItemComponent {
  public position = input.required<IPosition>();
  protected readonly combinePrice = combinePrice;
}
