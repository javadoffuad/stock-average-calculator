import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/calculator/calculator.component').then(m => m.CalculatorComponent),
  },
  {
    path: 'access-token',
    loadComponent: () => import('../components/access-token/access-token.component').then(m => m.AccessTokenComponent),
  },
  {
    path: 'positions',
    loadComponent: () => import('../components/positions/positions.component').then(m => m.PositionsComponent),
  }
];
