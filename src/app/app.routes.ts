import { Routes } from '@angular/router';

// Each page loads on its first visit; icons need nothing for that.
export const routes: Routes = [
  {
    path: '',
    title: 'Lordicon × Angular',
    loadComponent: () => import('./basics/basics-page').then((m) => m.BasicsPage),
  },
  {
    path: 'state',
    title: 'Angular state · Lordicon × Angular',
    loadComponent: () => import('./state/state-page').then((m) => m.StatePage),
  },
  {
    path: 'loading',
    title: 'Loading · Lordicon × Angular',
    loadComponent: () => import('./loading/loading-page').then((m) => m.LoadingPage),
  },
  { path: '**', redirectTo: '' },
];
