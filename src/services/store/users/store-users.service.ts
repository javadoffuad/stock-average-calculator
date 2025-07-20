import {computed, inject, Injectable, signal} from '@angular/core';
import {IAccount, ICommission, IInfo, Tariff} from '../../../models/account.models';
import {UsersService} from '../../api';

@Injectable({
  providedIn: 'root'
})
export class StoreUsersService {
  private readonly usersService = inject(UsersService);

  private accounts = signal<IAccount[]>([]);
  private info = signal<IInfo | null>(null);

  public currentAccount = computed(() => this.accounts().length ? this.accounts()[0] : null);
  public currentInfo = computed(() => this.info());
  public currentCommission = computed(() => {
    const tariff = this.currentInfo()?.tariff;
    return tariff ? this.getCommission(tariff) : null;
  });

  public loadAccounts(): void{
    this.usersService.loadAccounts().subscribe(accounts => this.accounts.set(accounts));
  }

  public getInfo(): void {
    this.usersService.getInfo().subscribe(response => this.info.set(response));
  }

  private getCommission(tariff: Tariff): ICommission | null {
    switch (tariff) {
      case Tariff.INVESTOR:
        return {
          bond: 0.3,
          share: 0.3,
          etf: 0.3,
          futures: 0.1,
          currency: 0.9,
          preciousMetals: 1.9,
        }
      case Tariff.TRADER:
        return {
          bond: 0.05,
          share: 0.05,
          etf: 0.05,
          futures: 0.04,
          currency: 0.5,
          preciousMetals: 1.5,
        }
      case Tariff.PREMIUM:
        return {
          bond: 0.04,
          share: 0.04,
          etf: 0.04,
          futures: 0.04,
          currency: 0.5,
          preciousMetals: 0.9,
        }
      default:
        return null;
    }
  }
}
