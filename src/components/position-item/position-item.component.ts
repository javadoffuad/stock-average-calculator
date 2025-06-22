import {Component, computed, input, Signal} from '@angular/core';
import {IPosition} from '../../models/operation.models';
import {combinePrice} from '../../utils/currency.utils';
import {RouterLink} from '@angular/router';
import {TuiCard} from '@taiga-ui/layout';
import {TuiAppearance, TuiAutoColorPipe, TuiInitialsPipe, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiAmountPipe, TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {AsyncPipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-position-item',
  imports: [
    RouterLink,
    TuiCard,
    TuiAppearance,
    TuiTitle,
    TuiAvatar,
    TuiAutoColorPipe,
    TuiInitialsPipe,
    TuiCurrencyPipe,
    UpperCasePipe,
    TuiAmountPipe,
    AsyncPipe,
  ],
  templateUrl: './position-item.component.html',
  styleUrl: './position-item.component.css'
})
export class PositionItemComponent {
  public position = input.required<IPosition>();
  protected readonly combinePrice = combinePrice;
  protected readonly quantityUnits: Signal<number> = computed(() => Number(this.position().quantity.units));
}
