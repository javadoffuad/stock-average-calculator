import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import { TuiTab, TuiTabsHorizontal } from '@taiga-ui/kit';
import {IPosition} from '../../models/operation.models';
import {PAGE_POSITIONS_PARAM, ROUTES} from '../../constants/routes.constants';
import {StockCardComponent} from '../stock-card/stock-card.component';
import {InstrumentsService} from '../../services/instruments/instruments.service';
import {OperationsService} from '../../services/operations.service';
import {IInstrument} from '../../models/instrument.models';
import {SectorsService} from '../../services/sectors/sectors.service';
import {TuiLink} from '@taiga-ui/core';

@Component({
  selector: 'app-stock-detail',
  imports: [
    RouterLink,
    TuiTabsHorizontal,
    TuiTab,
    StockCardComponent,
    RouterOutlet,
    TuiLink,
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDetailComponent {
  private instrumentsService = inject(InstrumentsService);
  private sectorsService = inject(SectorsService);
  private operationsService = inject(OperationsService);
  private route = inject(ActivatedRoute);

  protected readonly stocksPage = ROUTES.home;
  protected stock = signal<IPosition | null>(null);
  protected instrument = this.instrumentsService.selectInstrument;
  protected sectorName = computed(() => {
    const sectorCode = this.instrument()?.sector;
    return sectorCode ? this.sectorsService.getItemByCode(sectorCode)?.name ?? '' : '';
  });
  protected position = this.operationsService.getPositionBy(this.route.snapshot.paramMap.get(PAGE_POSITIONS_PARAM) ?? '');
  protected activeTabIndex = 0;

  constructor() {
    effect(() => {
      const position = this.position();
      console.log('position', position);

      if (position) {
        this.instrumentsService.loadInstrumentBy(position.instrumentUid);
      }
    });
  }

  onClick(sectionName: string) {
    console.log('click', sectionName);
  }

  toggleFavorite(stock: IInstrument): void {
    // this.featureStocksService.setStock(stock);
  }

  protected readonly routes = ROUTES;
}
