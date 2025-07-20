import {Component, computed, effect, inject, Signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UsersService} from '../../services/users/users.service';
import {OperationsService} from '../../services/operations/operations.service';
import {IAccount} from '../../models/account.models';
import {InstrumentsService} from '../../services/instruments/instruments.service';

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
  private readonly instrumentsService = inject(InstrumentsService);

  protected account: Signal<IAccount | null> = this.usersService.currentAccount;
  protected portfolio = this.operationsService.selectPortfolio;
  protected positions = computed(() => this.portfolio()?.positions);
  protected positionShares = computed(() => this.positions()?.filter(p => p.instrumentType === 'share') || [])

  constructor() {
    effect(() => {
      const account = this.account();

      if (account) {
        this.operationsService.loadPortfolio(account.id);
      } else {
        this.loadAccounts();
        this.getInfo();
      }
    });

    effect(() => {
      const positionShareIds = this.positionShares().map(p => p.instrumentUid);

      if (positionShareIds.length) {
        this.instrumentsService.loadSharesBy(positionShareIds);
      }
    });
  }

  private loadAccounts() {
    this.usersService.loadAccounts();
  }
  private getInfo() {
    this.usersService.getInfo();
  }
}
