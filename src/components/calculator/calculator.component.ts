import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton, TuiIcon, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiInputNumber, TuiTooltip} from '@taiga-ui/kit';
import {TuiAmountPipe, TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiCard} from '@taiga-ui/layout';
import {ICommission} from '../../models/account.models';
import {AsyncPipe} from '@angular/common';
import {FacadeUsersService} from '../../services/facade';

interface ICalculateAverageParams {
  currentShares: number;     // Текущее количество акций
  averagePrice: number;      // Текущая средняя цена (руб.)
  targetPrice: number;       // Желаемая средняя цена (руб.)
  currentMarketPrice: number; // Текущая рыночная цена (руб.)
  commission: ICommission | null;
}

interface IResult {
  sharesToBuy: number;
  newAveragePrice: number;
  newTotalCost: number;
  commission?: number;
}

@Component({
  selector: 'app-calculator',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputNumber,
    TuiTooltip,
    TuiCurrencyPipe,
    TuiIcon,
    TuiAppearance,
    TuiCard,
    TuiTitle,
    TuiButton,
    TuiAmountPipe,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  private readonly facadeUsersService = inject(FacadeUsersService);

  protected readonly commission = this.facadeUsersService.selectCommission;
  protected title = 'Рассчет средней цены акций';
  protected form = new FormGroup({
    currentShares: new FormControl(null),
    averagePrice: new FormControl(null),
    targetPrice: new FormControl(null),
    currentMarketPrice: new FormControl(null),
  });
  protected result = signal<IResult | null>(null);

  /**
   * Рассчитывает, сколько акций нужно докупить, чтобы достичь целевой средней цены.
   * Возвращает { sharesToBuy, newAveragePrice }, где:
   * - sharesToBuy — количество акций для покупки (дробное число, если требуется точный расчет)
   * - newAveragePrice — новая средняя цена (для проверки)
   */
  protected calculateAdditionalShares(
    params: ICalculateAverageParams
  ): IResult {
    const { currentShares, averagePrice, targetPrice, currentMarketPrice, commission } = params;

    // Уравнение для расчета:
    // (currentShares * averagePrice + sharesToBuy * currentMarketPrice) / (currentShares + sharesToBuy) = targetPrice
    // Решаем относительно sharesToBuy:
    const numerator = currentShares * (averagePrice - targetPrice);
    const denominator = targetPrice - currentMarketPrice;

    if (denominator <= 0) {
      throw new Error(
        `Невозможно достичь целевой цены ${targetPrice} руб., ` +
        `так как рыночная цена (${currentMarketPrice} руб.) не ниже целевой.`
      );
    }

    const sharesToBuy = Math.ceil(numerator / denominator);

    // Проверяем расчет:
    const totalCost = currentShares * averagePrice + sharesToBuy * currentMarketPrice;
    const totalShares = currentShares + sharesToBuy;
    const newAveragePrice = totalCost / totalShares;
    const newTotalCost = (sharesToBuy * newAveragePrice);
    const commissionPrice = commission ? (newTotalCost / 100 * commission.share) : undefined;

    return {
      sharesToBuy,
      newAveragePrice,
      newTotalCost: (sharesToBuy * newAveragePrice),
      commission: commissionPrice,
    };
  }

  protected showResult() {
    const currentShares = this.form.controls.currentShares.value;
    const averagePrice = this.form.controls.averagePrice.value;
    const targetPrice = this.form.controls.targetPrice.value;
    const currentMarketPrice = this.form.controls.currentMarketPrice.value;
    const commission = this.commission();

    if (!(currentShares && averagePrice && targetPrice && currentMarketPrice)) {
      return;
    }

    const result = this.calculateAdditionalShares({
      currentShares,
      averagePrice,
      targetPrice,
      currentMarketPrice,
      commission,
    });

    this.result.set(result);
  }
}
