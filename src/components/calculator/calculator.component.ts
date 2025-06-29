import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton, TuiIcon, TuiTextfield, TuiTitle} from '@taiga-ui/core';
import {TuiInputNumber, TuiTooltip} from '@taiga-ui/kit';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiCard} from '@taiga-ui/layout';

interface ICalculateAdditionalSharesParams {
  currentShares: number;     // Текущее количество акций
  averagePrice: number;      // Текущая средняя цена (руб.)
  targetPrice: number;       // Желаемая средняя цена (руб.)
  currentMarketPrice: number; // Текущая рыночная цена (руб.)
}

interface IResult {
  sharesToBuy: number;
  newAveragePrice: number;
  newTotalCost: number;
}

@Component({
  selector: 'app-calculator',
  imports: [
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
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
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
    params: ICalculateAdditionalSharesParams
  ): IResult {
    const { currentShares, averagePrice, targetPrice, currentMarketPrice } = params;

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

    return {
      sharesToBuy,
      newAveragePrice,
      newTotalCost: (sharesToBuy * newAveragePrice),
    };
  }

  protected showResult() {
    const currentShares = this.form.controls.currentShares.value;
    const averagePrice = this.form.controls.averagePrice.value;
    const targetPrice = this.form.controls.targetPrice.value;
    const currentMarketPrice = this.form.controls.currentMarketPrice.value;

    if (!(currentShares && averagePrice && targetPrice && currentMarketPrice)) {
      return;
    }

    const result = this.calculateAdditionalShares({
      currentShares,
      averagePrice,
      targetPrice,
      currentMarketPrice,
    });

    this.result.set(result);
  }
}
