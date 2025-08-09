import { Routes } from '@angular/router';

export const PRACTICE_ROUTES: Routes = [
  {
    path: 'practice',
    loadComponent: () => 
      import('./components/practice-home/practice-home.component')
        .then(m => m.PracticeHomeComponent),
    title: 'Práctica - FlashTouch',
  },
  // Aquí puedes agregar más rutas específicas de práctica
];
