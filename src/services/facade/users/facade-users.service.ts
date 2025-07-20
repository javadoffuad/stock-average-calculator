import { inject, Injectable} from '@angular/core';
import {StoreUsersService} from '../../store/users/store-users.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeUsersService {
  private readonly storeUsersService = inject(StoreUsersService);

  public selectCurrentAccount = this.storeUsersService.currentAccount;
  public selectCommission = this.storeUsersService.currentCommission;

  public loadAccounts(): void{
    this.storeUsersService.loadAccounts();
  }

  public getInfo(): void {
    this.storeUsersService.getInfo();
  }
}
