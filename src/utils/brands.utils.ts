import {API_BRANDS_URL} from '../constants/api.constants';

export function getFullLogoUrl(brand: {logoName: string}): string {
  const logoName = brand.logoName.replace('.png', 'x160.png')
  return API_BRANDS_URL + logoName;
}
