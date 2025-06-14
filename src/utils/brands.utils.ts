import {API_BRANDS_URL} from '../constants/api.constants';

export function getFullLogoUrl(brand: {logoName: string}): string {
  const logoName = brand.logoName.replace('.png', 'x640.png')
  return API_BRANDS_URL + logoName;
}
