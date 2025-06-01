import {Component, effect, inject, OnInit, Signal, signal} from '@angular/core';
import {UsersService} from '../services/users.service';
import {OperationsService} from '../services/operations.service';
import {IAccount} from '../models/account.models';
import {CalculatorComponent} from '../components/calculator/calculator.component';
import {AccessTokenComponent} from '../components/access-token/access-token.component';
import {PositionsComponent} from '../components/positions/positions.component';

@Component({
  selector: 'app-root',
  imports: [CalculatorComponent, AccessTokenComponent, PositionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly operationsService = inject(OperationsService);

  protected account: Signal<IAccount | null> = this.usersService.currentAccount;
  protected portfolio = this.operationsService.selectPortfolio;
  protected title = 'Рассчет средней цены акций';

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
}
