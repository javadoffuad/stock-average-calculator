import {API_BRANDS_URL, API_COUNTRIES_URL, API_EXCHANGES_URL} from '../constants/api.constants';
import {RealExchange} from '../models/instrument.models';

export function getFullLogoUrl(brand: {logoName: string}): string {
  const logoName = brand.logoName.replace('.png', 'x160.png')
  return API_BRANDS_URL + logoName;
}

export function getFullFlagUrl(countryCode: string): string {
  const logoName = countryCode + '.png';
  return API_COUNTRIES_URL + logoName;
}

export function getFullExchangeLogoUrl(exchange: RealExchange): string | null {
  let logoName: string | null = null;

  switch (exchange) {
    case RealExchange.REAL_EXCHANGE_RTS:
      logoName = 'MosExchange';
      break;
    case RealExchange.REAL_EXCHANGE_MOEX:
      logoName = 'MosExchange';
      break;
    default:
      logoName = null;
  }

  return logoName
    ? API_EXCHANGES_URL + logoName + '.png'
    : null;
}
