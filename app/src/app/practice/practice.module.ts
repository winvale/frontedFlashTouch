import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRACTICE_ROUTES } from './practice.routes';

@NgModule({
  declarations: [
    // Aquí se importarán los componentes de práctica
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PRACTICE_ROUTES)
  ],
  providers: [
    // Aquí se importarán los servicios de práctica
  ]
})
export class PracticeModule { }
