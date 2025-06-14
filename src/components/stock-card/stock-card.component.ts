import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar, TuiLike } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import {IPosition} from '../../models/operation.models';
import {IInstrument} from '../../models/instrument.models';
import {getFullLogoUrl} from '../../utils/brands.utils';

@Component({
  selector: 'app-stock-card',
  imports: [TuiAppearance, TuiAvatar, TuiCardLarge, TuiLike, TuiTitle],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardComponent {
  public instrument = input.required<IInstrument>();
  public sectorName = input.required<string | null>();
  protected readonly logoUrl = computed(() => getFullLogoUrl(this.instrument().brand));
  protected readonly cardColorStyle = computed(() => {
    const logoBaseColor = this.instrument().brand.logoBaseColor;
    const rgbColor = this.hexToRgb(logoBaseColor);
    const darkenColor = this.darkenRgb(rgbColor).join(',');
    return `background: linear-gradient(235deg, rgb(${darkenColor}), rgb(${rgbColor.join(',')}));`;
  });

  toggleFavorite = output<IPosition>();

  favorite(stock: IInstrument): void {
    // this.toggleFavorite.emit({ ...stock, isFavorite: !stock.isFavorite });
  }

  private hexToRgb(hex: string): number[] {
    // Убираем #, если есть
    hex = hex.replace('#', '');
    // Разбираем на компоненты R, G, B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }

  private darkenRgb(rgb: number[], factor = 0.8): number[] {
    return rgb.map(channel => Math.round(channel * factor));
  }
}
