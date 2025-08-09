import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./practice/practice.module')
      .then(m => m.PracticeModule)
  },
  // Otras rutas pueden ir aquí
];
