import { Routes } from '@angular/router';
import {authGuard} from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../components/positions/positions.component').then(m => m.PositionsComponent),
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
