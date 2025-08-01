import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {IPosition} from '../../models/operation.models';
import {PAGE_POSITIONS_PARAM, ROUTES} from '../../constants/routes.constants';
import {StockCardComponent} from '../stock-card/stock-card.component';
import {FacadeInstrumentsService, FacadeOperationsService} from '../../services/facade';
import {IInstrument, RealExchange} from '../../models/instrument.models';
import {SectorsService} from '../../services/sectors/sectors.service';
import {TuiAutoColorPipe, TuiLink, TuiTitle} from '@taiga-ui/core';
import {TuiAvatar} from '@taiga-ui/kit';

@Component({
  selector: 'app-stock-detail',
  imports: [
    RouterLink,
    StockCardComponent,
    TuiLink,
    TuiTitle,
    TuiAvatar,
    TuiAutoColorPipe,
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDetailComponent {
  private facadeInstrumentsService = inject(FacadeInstrumentsService);
  private sectorsService = inject(SectorsService);
  private facadeOperationsService = inject(FacadeOperationsService);
  private route = inject(ActivatedRoute);

  protected readonly stocksPage = ROUTES.home;
  protected stock = signal<IPosition | null>(null);
  protected instrument = signal<IInstrument | null>(null);
  protected sectorName = computed(() => {
    const sectorCode = this.instrument()?.sector;
    return sectorCode ? this.sectorsService.getItemByCode(sectorCode)?.name ?? '' : '';
  });
  protected position = this.facadeOperationsService.selectPositionBy(this.route.snapshot.paramMap.get(PAGE_POSITIONS_PARAM) ?? '');
  protected activeTabIndex = 0;
  protected readonly routes = ROUTES;

  constructor() {
    effect(() => {
      const position = this.position();

      if (position) {
        const instrument = this.facadeInstrumentsService.selectInstrumentBy(position.instrumentUid);
        this.instrument.set(instrument);
      }
    });
  }

  onClick(sectionName: string) {
    console.log('click', sectionName);
  }

  toggleFavorite(instrument: IInstrument): void {
    // this.featureStocksService.setStock(instrument);
  }

  getRealExchange(realExchange: RealExchange): string {
    switch (realExchange) {
      case RealExchange.REAL_EXCHANGE_MOEX:
        return 'Московская биржа';
      case RealExchange.REAL_EXCHANGE_RTS:
        return 'Санкт-Петербургская биржа';
      case RealExchange.REAL_EXCHANGE_OTC:
        return 'Внебиржевой инструмент';
      default:
        return 'Тип не определён';
    }
  }
}
