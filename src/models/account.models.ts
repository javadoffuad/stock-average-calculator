export interface IAccount {
  openedDate: string;
  closedDate: string;
  name: string;
  id: string;
}

export interface IGetAccountsResponse {
  accounts: IAccount[]
}

export interface IInfo {
  premStatus: boolean;
  qualStatus: boolean;
  qualifiedForWorkWith: QualifiedType[];
  tariff: Tariff;
  userId: string;
  riskLevelCode: string;
  id: string;
}

export enum QualifiedType {
  DERIVATIVE = "derivative",
  STRUCTURED_BONDS = "structured_bonds",
  CLOSED_FUND = "closed_fund",
  BOND = "bond",
  STRUCTURED_INCOME_BONDS = "structured_income_bonds",
  RUSSIAN_SHARES = "russian_shares",
  LEVERAGE = "leverage",
  FOREIGN_SHARES = "foreign_shares",
  FOREIGN_ETF = "foreign_etf",
  FOREIGN_BOND = "foreign_bond",
  OPTION = "option",
  NON_QUOTED_INSTRUMENTS = "non_quoted_instruments",
  CONVERTIBLE_BONDS = "convertible_bonds",
  RUSSIAN_BONDS_FOREIGN_LAW = "russian_bonds_foreign_law",
  FOREIGN_BONDS_RUSSIAN_LAW = "foreign_bonds_russian_law"
}

export enum Tariff {
  INVESTOR = "investor",
  TRADER = "trader",
  PREMIUM = "premium",
}

export interface ICommission {
  share: number;
  bond: number;
  etf: number;
  futures: number;
  currency: number;
  preciousMetals: number;
}
