import {Component, computed, effect, inject, Signal} from '@angular/core';
import {PositionItemComponent} from '../position-item/position-item.component';
import {UsersService} from '../../services/users.service';
import {OperationsService} from '../../services/operations.service';
import {IAccount} from '../../models/account.models';

@Component({
  selector: 'app-positions',
  imports: [
    PositionItemComponent
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent {
  private readonly usersService = inject(UsersService);
  private readonly operationsService = inject(OperationsService);

  protected account: Signal<IAccount | null> = this.usersService.currentAccount;
  protected portfolio = this.operationsService.selectPortfolio;
  public positions = computed(() => this.portfolio()?.positions);
  protected positionShares = computed(() => this.positions()?.filter(p => p.instrumentType === 'share'))

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
}
