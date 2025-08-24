import { Routes } from '@angular/router';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  {
    path: 'practice',
    loadChildren: () => import('./practice/practice.routes')
      .then(r => r.PRACTICE_ROUTES),
    canMatch: [authGuard]
  }
  // Otras rutas pueden ir aquí
];
