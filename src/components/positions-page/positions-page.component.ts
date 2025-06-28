import {Component, effect, inject, OnInit, Signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {OperationsService} from '../../services/operations.service';
import {IAccount} from '../../models/account.models';

@Component({
  selector: 'app-positions-page',
  imports: [
    RouterOutlet
  ],
  templateUrl: './positions-page.component.html',
})
export class PositionsPageComponent {
  private readonly usersService = inject(UsersService);
  private readonly operationsService = inject(OperationsService);

  protected account: Signal<IAccount | null> = this.usersService.currentAccount;

  constructor() {
    effect(() => {
      const account = this.account();

      if (account) {
        this.operationsService.loadPortfolio(account.id);
      } else {
        this.loadAccounts();
      }
    });
  }

  private loadAccounts() {
    this.usersService.loadAccounts();
  }
}
