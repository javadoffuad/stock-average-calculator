import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import { TuiTab, TuiTabsHorizontal } from '@taiga-ui/kit';
import {IPosition} from '../../models/operation.models';
import {PAGE_POSITIONS_PARAM, ROUTES} from '../../constants/routes.constants';
import {StockCardComponent} from '../stock-card/stock-card.component';
import {InstrumentsService} from '../../services/instruments/instruments.service';
import {OperationsService} from '../../services/operations.service';
import {IInstrument} from '../../models/instrument.models';
import {SectorsService} from '../../services/sectors/sectors.service';

@Component({
  selector: 'app-stock-detail',
  imports: [
    RouterLink,
    TuiTabsHorizontal,
    TuiTab,
    StockCardComponent,
    RouterOutlet,
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockDetailComponent implements OnInit {
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
  protected activeTabIndex = 0;

  ngOnInit() {
    const ticker = this.route.snapshot.paramMap.get(PAGE_POSITIONS_PARAM) ?? '';
    const position = this.operationsService.getPositionByTicker(ticker);
    console.log('position', position);

    if (position) {
      this.instrumentsService.loadInstrumentBy(position.instrumentUid);
    }
  }

  onClick(sectionName: string) {
    console.log('click', sectionName);
  }

  toggleFavorite(stock: IInstrument): void {
    // this.featureStocksService.setStock(stock);
  }
}
