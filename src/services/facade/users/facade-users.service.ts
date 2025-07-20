import {computed, inject, Injectable, signal} from '@angular/core';
import {IAccount} from '../../../models/account.models';
import {StoreUsersService} from '../../store/users/store-users.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeUsersService {
  private readonly storeUsersService = inject(StoreUsersService);

  private accounts = signal<IAccount[]>([]);
  public currentAccount = computed(() => this.accounts().length ? this.accounts()[0] : null);
  public currentCommission = computed(() => this.storeUsersService.currentCommission());

  public loadAccounts(): void{
    this.storeUsersService.loadAccounts();
  }

  public getInfo(): void {
    this.storeUsersService.getInfo();
  }
}
