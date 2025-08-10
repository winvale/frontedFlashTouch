import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PracticeHeaderComponent } from '../practice-header/practice-header.component';
import { PracticeFooterComponent } from '../practice-footer/practice-footer.component';

@Component({
  selector: 'app-practice-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PracticeHeaderComponent, PracticeFooterComponent],
  template: `
    <app-practice-header></app-practice-header>
    <router-outlet />
    <app-practice-footer></app-practice-footer>
  `,
})
export class PracticeLayoutComponent {}


