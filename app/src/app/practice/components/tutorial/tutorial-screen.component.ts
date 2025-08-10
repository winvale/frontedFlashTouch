import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tutorial-screen">
      <div class="header">
        <h2>Guía de Uso</h2>
        <button class="btn btn-primary" (click)="finishTutorial()">
          Comenzar a Practicar
        </button>
      </div>
      
      <div class="tutorial-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Selecciona tu Nivel</h3>
            <p>Elige entre los diferentes niveles disponibles según tu conocimiento actual del idioma.</p>
            <div class="step-image">📊</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Aprende Nuevas Palabras</h3>
            <p>Estudia las palabras con imágenes y ejemplos de contexto para mejorar tu vocabulario.</p>
            <div class="step-image">📚</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Practica con Ejercicios</h3>
            <p>Realiza ejercicios interactivos para reforzar lo aprendido.</p>
            <div class="step-image">✍️</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Realiza Exámenes</h3>
            <p>Pon a prueba tus conocimientos con exámenes cronometrados.</p>
            <div class="step-image">📝</div>
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>Revisa tu Progreso</h3>
            <p>Mantén un registro de tus avances y palabras aprendidas.</p>
            <div class="step-image">📈</div>
          </div>
        </div>
      </div>
      
      <div class="tutorial-tips">
        <h3>Consejos para el Éxito</h3>
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-icon">⏱️</div>
            <h4>Practica Regularmente</h4>
            <p>Dedica al menos 10-15 minutos diarios para ver mejores resultados.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">🔊</div>
            <h4>Escucha la Pronunciación</h4>
            <p>Usa el botón de audio para familiarizarte con la pronunciación correcta.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">⭐</div>
            <h4>Marca las Difíciles</h4>
            <p>Marca las palabras que te resulten difíciles para repasarlas después.</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">🔄</div>
            <h4>Repasa con Frecuencia</h4>
            <p>El repaso espaciado es clave para la retención a largo plazo.</p>
          </div>
        </div>
      </div>
      
      <div class="tutorial-footer">
        <button class="btn btn-primary" (click)="finishTutorial()">
          ¡Entendido, empezar a practicar!
        </button>
      </div>
    </div>
  `,
  styles: [`
    .tutorial-screen {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .header h2 {
      margin: 0;
      color: #2d3436;
    }
    
    .tutorial-steps {
      margin: 40px 0;
    }
    
    .step {
      display: flex;
      margin-bottom: 40px;
      position: relative;
      padding-left: 40px;
    }
    
    .step:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 30px;
      top: 50px;
      bottom: -40px;
      width: 2px;
      background: #e0e0e0;
    }
    
    .step-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      font-weight: bold;
      margin-right: 20px;
      flex-shrink: 0;
      position: absolute;
      left: 0;
    }
    
    .step-content {
      flex: 1;
      background: white;
      border-radius: 15px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    
    .step-content h3 {
      margin-top: 0;
      color: #2d3436;
    }
    
    .step-content p {
      color: #636e72;
      margin-bottom: 15px;
    }
    
    .step-image {
      font-size: 60px;
      text-align: center;
      margin-top: 15px;
    }
    
    .tutorial-tips {
      margin: 60px 0 40px;
    }
    
    .tutorial-tips h3 {
      text-align: center;
      color: #2d3436;
      margin-bottom: 30px;
    }
    
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin-bottom: 30px;
    }
    
    .tip-card {
      background: white;
      border-radius: 15px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: transform 0.3s ease;
    }
    
    .tip-card:hover {
      transform: translateY(-5px);
    }
    
    .tip-icon {
      font-size: 2.5em;
      margin-bottom: 15px;
    }
    
    .tip-card h4 {
      margin: 10px 0;
      color: #2d3436;
    }
    
    .tip-card p {
      color: #636e72;
      font-size: 0.95em;
      margin: 0;
    }
    
    .tutorial-footer {
      text-align: center;
      margin: 40px 0;
    }
    
    .btn {
      padding: 12px 30px;
      border: none;
      border-radius: 50px;
      font-size: 1.1em;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      color: white;
      font-weight: 500;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(29, 209, 161, 0.3);
    }
    
    @media (max-width: 768px) {
      .step {
        flex-direction: column;
        padding-left: 0;
        padding-top: 70px;
      }
      
      .step:not(:last-child)::after {
        left: 30px;
        top: 120px;
        bottom: -40px;
      }
      
      .step-number {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin: 0 0 20px 0;
      }
      
      .tips-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TutorialScreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario ya ha visto el tutorial
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {
      this.router.navigate(['/practice']);
    }
  }

  finishTutorial(): void {
    // Marcar que el usuario ha visto el tutorial
    localStorage.setItem('hasSeenTutorial', 'true');
    this.router.navigate(['/practice']);
  }
}
