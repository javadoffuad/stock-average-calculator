export interface IAccount {
  openedDate: string;
  closedDate: string;
  name: string;
  id: string;
}

export interface IGetAccountsResponse {
  accounts: IAccount[]
}
