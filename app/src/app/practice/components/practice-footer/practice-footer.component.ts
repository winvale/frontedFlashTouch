import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="practice-footer">
      <div class="pf-inner">
        <span>2024 FlashTouch</span>
        <span class="dot">•</span>
        <span>Aprende mejor cada día</span>
      </div>
    </footer>
  `,
  styles: [`
    .practice-footer {
      background: #0f172a;
      color: #cbd5e1;
      padding: 12px 0;
      margin-top: 24px;
    }
    .pf-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.95rem;
      justify-content: center;
    }
    .dot { opacity: 0.6; }
  `]
})
export class PracticeFooterComponent {}


