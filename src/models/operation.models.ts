export interface IPortfolio {
  accountId: string;
  positions: IPosition[];
  totalAmountBonds: ICurrency;
  totalAmountCurrencies: ICurrency;
  totalAmountEtf: ICurrency;
  totalAmountFutures: ICurrency;
  totalAmountOptions: ICurrency;
  totalAmountPortfolio: ICurrency;
  totalAmountShares: ICurrency;
  totalAmountSp: ICurrency;
}

export interface ICurrency {
  currency: string;
  units: string;
  nano: number;
}

export interface IPosition {
  averagePositionPrice: ICurrency;
  averagePositionPriceFifo: ICurrency;
  averagePositionPricePt: ICurrency;
  blocked: boolean;
  blockedLots: {
    units: string;
    nano: number;
  };
  currentPrice: ICurrency;
  dailyYield: ICurrency;
  expectedYield: {
    units: string;
    nano: number;
  };
  expectedYieldFifo: {
    units: string;
    nano: number;
  };
  figi: string;
  instrumentType: string;
  instrumentUid: string;
  positionUid: string;
  quantity: {
    units: string;
    nano: number;
  };
  quantityLots: {
    units: string;
    nano: number;
  };
  ticker: string;
}
