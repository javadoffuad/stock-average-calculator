import {Component, computed, effect, inject, Signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FacadeInstrumentsService, FacadeOperationsService, FacadeUsersService} from '../../services/facade';
import {IAccount} from '../../models/account.models';

@Component({
  selector: 'app-positions-page',
  imports: [
    RouterOutlet
  ],
  templateUrl: './positions-page.component.html',
})
export class PositionsPageComponent {
  private readonly facadeUsersService = inject(FacadeUsersService);
  private readonly facadeOperationsService = inject(FacadeOperationsService);
  private readonly facadeInstrumentsService = inject(FacadeInstrumentsService);

  protected account: Signal<IAccount | null> = this.facadeUsersService.currentAccount;
  protected portfolio = this.facadeOperationsService.selectPortfolio();
  protected positions = computed(() => this.portfolio()?.positions);
  protected positionShares = computed(() => this.positions()?.filter(p => p.instrumentType === 'share') || [])

  constructor() {
    effect(() => {
      const account = this.account();

      if (account) {
        this.facadeOperationsService.loadPortfolio(account.id);
      } else {
        this.loadAccounts();
        this.getInfo();
      }
    });

    effect(() => {
      const positionShareIds = this.positionShares().map(p => p.instrumentUid);

      if (positionShareIds.length) {
        this.facadeInstrumentsService.loadSharesBy(positionShareIds);
      }
    });
  }

  private loadAccounts() {
    this.facadeUsersService.loadAccounts();
  }
  private getInfo() {
    this.facadeUsersService.getInfo();
  }
}
