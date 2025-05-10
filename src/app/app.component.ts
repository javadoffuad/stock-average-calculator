import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

interface CalculateAdditionalSharesParams {
  currentShares: number;     // Текущее количество акций
  averagePrice: number;      // Текущая средняя цена (руб.)
  targetPrice: number;       // Желаемая средняя цена (руб.)
  currentMarketPrice: number; // Текущая рыночная цена (руб.)
}

interface Result {
  sharesToBuy: number;
  newAveragePrice: number;
  totalCost: number;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected title = 'stock-average-calculator';
  protected form = new FormGroup({
    currentShares: new FormControl(null),
    averagePrice: new FormControl(null),
    targetPrice: new FormControl(null),
    currentMarketPrice: new FormControl(null),
  });
  protected result = signal<Result | null>(null);

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  /**
   * Рассчитывает, сколько акций нужно докупить, чтобы достичь целевой средней цены.
   * Возвращает { sharesToBuy, newAveragePrice }, где:
   * - sharesToBuy — количество акций для покупки (дробное число, если требуется точный расчет)
   * - newAveragePrice — новая средняя цена (для проверки)
   */
  protected calculateAdditionalShares(
    params: CalculateAdditionalSharesParams
  ): { sharesToBuy: number; newAveragePrice: number, totalCost: number } {
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

    const sharesToBuy = numerator / denominator;

    // Проверяем расчет:
    const totalCost = currentShares * averagePrice + sharesToBuy * currentMarketPrice;
    const totalShares = currentShares + sharesToBuy;
    const newAveragePrice = totalCost / totalShares;

    return {
      sharesToBuy,
      newAveragePrice,
      totalCost: (sharesToBuy * newAveragePrice)
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

    console.log(`Нужно докупить ${result.sharesToBuy.toFixed(1)} акций, на сумму: ${result.totalCost} руб.`);
    console.log(`Новая средняя цена: ${result.newAveragePrice.toFixed(2)} руб.`);
  }
}
