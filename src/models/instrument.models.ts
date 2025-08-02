export interface IInstrumentResponse {
  instrument: IInstrument;
}

export interface IInstrument {
  figi: string;
  ticker: string;
  classCode: string;
  isin: string;
  lot: number;
  currency: string;
  klong: {
    units: string;
    nano: number;
  };
  kshort: {
    units: string;
    nano: number;
  };
  dlong: {
    units: string;
    nano: number;
  };
  dshort: {
    units: string;
    nano: number;
  };
  dlongMin: {
    units: string;
    nano: number;
  };
  dshortMin: {
    units: string;
    nano: number;
  };
  shortEnabledFlag: boolean;
  name: string;
  exchange: string;
  ipoDate: string;
  issueSize: string;
  countryOfRisk: string;
  countryOfRiskName: string;
  sector: string;
  issueSizePlan: string;
  nominal: {
    currency: string;
    units: string;
    nano: number;
  };
  tradingStatus: string;
  otcFlag: boolean;
  buyAvailableFlag: boolean;
  sellAvailableFlag: boolean;
  divYieldFlag: boolean;
  shareType: string;
  minPriceIncrement: {
    units: string;
    nano: number;
  };
  apiTradeAvailableFlag: boolean;
  uid: string;
  realExchange: RealExchange;
  positionUid: string;
  assetUid: string;
  instrumentExchange: string;
  forIisFlag: boolean;
  forQualInvestorFlag: boolean;
  weekendFlag: boolean;
  blockedTcaFlag: boolean;
  liquidityFlag: boolean;
  first1minCandleDate: string;
  first1dayCandleDate: string;
  brand: {
    logoName: string;
    logoBaseColor: string;
    textColor: string;
  };
  dlongClient: {
    units: string;
    nano: number;
  };
  dshortClient: {
    units: string;
    nano: number;
  };
}

interface IBrand {
  uid: string;
  name: string;
  description: string;
  company: string;
  sector: string;
  countryOfRiskName: string;
  info: string;
  countryOfRisk: string;
}

export enum RealExchange {
  REAL_EXCHANGE_UNSPECIFIED =	'REAL_EXCHANGE_UNSPECIFIED', //	Тип не определён.
  REAL_EXCHANGE_MOEX	= 'REAL_EXCHANGE_MOEX', // Московская биржа.
  REAL_EXCHANGE_RTS = 'REAL_EXCHANGE_RTS', //	Санкт-Петербургская биржа.
  REAL_EXCHANGE_OTC	= 'REAL_EXCHANGE_OTC', //	Внебиржевой инструмент.
}

interface NanoUnits {
  nano: number;
  units: string;
}

interface ClearingCertificate {
  nominal: NanoUnits;
  nominalCurrency: string;
}

interface ISecurity {
  // etf?: Etf;
  clearingCertificate?: ClearingCertificate;
  share?: IInstrument;
  type: string;
  // bond?: Bond;
  // sp?: Sp;
  isin: string;
}

export interface IAssetResponse {
  asset: IAsset;
}

export interface IAsset {
  cfi: string;
  description: string;
  uid: string;
  requiredTests: string[];
  codeNsd: string;
  deletedAt: string;
  security: ISecurity;
  instruments: IInstrument[];
  gosRegCode: string;
  name: string;
  brCodeName: string;
  "currency": {
    "baseCurrency": string;
  },
  brCode: string;
  brand: IBrand;
  nameBrief: string;
  status: string;
  updatedAt: string;
}

