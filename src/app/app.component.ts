import {Component, effect, inject, OnInit, Signal, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {OperationsService} from '../services/operations.service';
import {IAccount} from '../models/account.models';

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
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly operationsService = inject(OperationsService);

  protected account: Signal<IAccount | null> = this.usersService.currentAccount;
  protected portfolio = this.operationsService.selectPortfolio;
  protected title = 'Рассчет средней цены акций';
  protected form = new FormGroup({
    currentShares: new FormControl(null),
    averagePrice: new FormControl(null),
    targetPrice: new FormControl(null),
    currentMarketPrice: new FormControl(null),
  });
  protected result = signal<IResult | null>(null);

  constructor() {
    effect(() => {
      const account = this.account();
      console.log('account', account)
      if (account) {
        this.operationsService.loadPortfolio(account.id);
      }
    });

    effect(() => {
      console.log('operation', this.portfolio())
    });
  }

  ngOnInit() {
    this.usersService.loadAccounts();
  }

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
