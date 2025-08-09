import { Component } from '@angular/core';

@Component({
  selector: 'app-practice-home',
  standalone: true,
  imports: [
    // Aquí se importarán los módulos necesarios
  ],
  template: `
    <div class="practice-container">
      <h1>Módulo de Práctica</h1>
      <p>Bienvenido a la sección de práctica de FlashTouch.</p>
      <!-- Aquí irá el contenido del componente -->
    </div>
  `,
  styles: [`
    .practice-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
  `]
})
export class PracticeHomeComponent {
  // Lógica del componente irá aquí
}
