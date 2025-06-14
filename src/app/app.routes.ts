import { Routes } from '@angular/router';
import {authGuard} from '../guards/auth.guard';
import {PAGE_POSITIONS_PARAM} from '../constants/routes.constants';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../components/positions-page/positions-page.component').then(m => m.PositionsPageComponent),
    children: [

      {
        path: `:${PAGE_POSITIONS_PARAM}`,
        loadComponent: () =>
          import('../components/stock-detail/stock-detail.component').then(
            (c) => c.StockDetailComponent,
          ),
      },
      {
        path: '',
        loadComponent: () => import('../components/positions/positions.component').then(m => m.PositionsComponent),
      },
    ],
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('../components/calculator/calculator.component').then(m => m.CalculatorComponent),
  },
  {
    path: 'access-token',
    loadComponent: () => import('../components/access-token/access-token.component').then(m => m.AccessTokenComponent),
  },
];
