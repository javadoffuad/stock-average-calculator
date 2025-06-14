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
  realExchange: string;
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
