import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PracticeService } from '../../services/practice.service';
import { Level } from '../../models/word.model';

@Component({
  selector: 'app-practice-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="practice-home">
      <div class="welcome-section">
        <h1>¡Aprende Inglés de Forma Visual!</h1>
        <p class="subtitle">Mejora tu vocabulario con nuestro método de aprendizaje basado en imágenes y contexto.</p>
        
        <div class="quick-stats">
          <div class="stat-item">
            <div class="stat-value">{{ userProgress.wordsLearned }}+</div>
            <div class="stat-label">Palabras Aprendidas</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userProgress.currentStreak }}</div>
            <div class="stat-label">Días de Racha</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userProgress.totalTime }}h</div>
            <div class="stat-label">Horas de Estudio</div>
          </div>
        </div>
      </div>
      
      <div class="action-cards">
        <div class="card" (click)="navigateTo('levels')">
          <div class="card-icon">📚</div>
          <h3>Aprender Nuevas Palabras</h3>
          <p>Explora palabras organizadas por niveles de dificultad y amplía tu vocabulario.</p>
          <div class="card-footer">
            <span class="link">Comenzar ahora →</span>
          </div>
        </div>
        
        <div class="card" (click)="navigateTo('quizzes')">
          <div class="card-icon">📝</div>
          <h3>Realizar Exámenes</h3>
          <p>Pon a prueba tus conocimientos con exámenes cronometrados.</p>
          <div class="card-footer">
            <span class="link">Iniciar examen →</span>
          </div>
        </div>
        
        <div class="card" (click)="navigateTo('progress')">
          <div class="card-icon">📊</div>
          <h3>Ver Mi Progreso</h3>
          <p>Revisa tus estadísticas y el avance en cada nivel.</p>
          <div class="card-footer">
            <span class="link">Ver detalles →</span>
          </div>
        </div>
      </div>
      
      <div class="levels-preview">
        <h2>Niveles Disponibles</h2>
        <div class="levels-grid">
          <div *ngFor="let level of levels" class="level-card" 
               [class.locked]="level.isLocked"
               (click)="selectLevel(level)">
            <div class="level-icon">{{ level.icon }}</div>
            <h3>{{ level.name }}</h3>
            <p>{{ level.description }}</p>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="getLevelProgress(level.id)"></div>
            </div>
            <div class="progress-text">
              {{ level.completedWords }} de {{ level.totalWords }} palabras
            </div>
            <div *ngIf="level.isLocked" class="locked-overlay">
              🔒 {{ level.requiredLevel ? 'Completa el nivel ' + level.requiredLevel : 'Requiere Plan Premium' }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="tutorial-cta" *ngIf="!hasSeenTutorial">
        <h3>¿Primera vez aquí?</h3>
        <p>Mira nuestro tutorial rápido para aprovechar al máximo la plataforma.</p>
        <button class="btn btn-outline" (click)="startTutorial()">Ver Tutorial</button>
      </div>
    </div>
  `,
  styles: [`
    .practice-home {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .welcome-section {
      text-align: center;
      margin-bottom: 50px;
      padding: 30px 20px;
      background: linear-gradient(135deg, #f6f9fc, #e3f2fd);
      border-radius: 15px;
    }
    
    h1 {
      color: #2d3436;
      margin-bottom: 15px;
      font-size: 2.5em;
    }
    
    .subtitle {
      color: #636e72;
      font-size: 1.2em;
      max-width: 700px;
      margin: 0 auto 30px;
    }
    
    .quick-stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 40px;
    }
    
    .stat-item {
      background: white;
      padding: 20px 30px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      min-width: 150px;
    }
    
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      color: #1dd1a1;
      margin-bottom: 5px;
    }
    
    .stat-label {
      color: #636e72;
      font-size: 0.9em;
    }
    
    .action-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      margin-bottom: 50px;
    }
    
    .card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border-color: #1dd1a1;
    }
    
    .card-icon {
      font-size: 2.5em;
      margin-bottom: 20px;
    }
    
    .card h3 {
      color: #2d3436;
      margin: 0 0 15px 0;
    }
    
    .card p {
      color: #636e72;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    
    .card-footer {
      display: flex;
      justify-content: flex-end;
    }
    
    .link {
      color: #1dd1a1;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .card:hover .link {
      transform: translateX(5px);
    }
    
    .levels-preview {
      margin: 60px 0;
    }
    
    .levels-preview h2 {
      text-align: center;
      color: #2d3436;
      margin-bottom: 30px;
    }
    
    .levels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }
    
    .level-card {
      background: white;
      border-radius: 15px;
      padding: 30px 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 2px solid transparent;
    }
    
    .level-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border-color: #1dd1a1;
    }
    
    .level-card.locked {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .level-icon {
      font-size: 2.5em;
      margin-bottom: 15px;
    }
    
    .level-card h3 {
      color: #2d3436;
      margin: 0 0 10px 0;
    }
    
    .level-card p {
      color: #636e72;
      margin: 0 0 20px 0;
      font-size: 0.9em;
    }
    
    .progress-bar {
      background: #e0e0e0;
      height: 8px;
      border-radius: 4px;
      margin: 15px 0 10px;
      overflow: hidden;
    }
    
    .progress-fill {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .progress-text {
      color: #636e72;
      font-size: 0.85em;
    }
    
    .locked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      color: #e74c3c;
    }
    
    .tutorial-cta {
      text-align: center;
      background: linear-gradient(135deg, #f8f9fa, #e9f7ef);
      padding: 30px;
      border-radius: 15px;
      margin-top: 50px;
    }
    
    .tutorial-cta h3 {
      color: #2d3436;
      margin: 0 0 10px 0;
    }
    
    .tutorial-cta p {
      color: #636e72;
      margin: 0 0 20px 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .btn {
      padding: 12px 30px;
      border: none;
      border-radius: 50px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-outline {
      background: transparent;
      border: 2px solid #1dd1a1;
      color: #1dd1a1;
      font-weight: 500;
    }
    
    .btn-outline:hover {
      background: #1dd1a1;
      color: white;
    }
    
    @media (max-width: 768px) {
      .quick-stats {
        flex-direction: column;
        gap: 15px;
      }
      
      .stat-item {
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
      }
      
      .action-cards {
        grid-template-columns: 1fr;
      }
      
      h1 {
        font-size: 2em;
      }
    }
  `]
})
export class PracticeHomeComponent implements OnInit {
  levels: Level[] = [];
  userProgress: any;
  hasSeenTutorial: boolean = true;

  constructor(
    private router: Router,
    private practiceService: PracticeService
  ) {}

  ngOnInit(): void {
    this.levels = this.practiceService.getLevels();
    this.userProgress = this.practiceService.getUserProgress();
    
    // Verificar si el usuario ha visto el tutorial
    this.hasSeenTutorial = localStorage.getItem('hasSeenTutorial') === 'true';
  }

  navigateTo(route: string): void {
    this.router.navigate(['/practice', route]);
  }

  selectLevel(level: Level): void {
    if (level.isLocked) return;
    this.router.navigate(['/practice/level', level.id]);
  }

  getLevelProgress(levelId: string): number {
    const level = this.levels.find(l => l.id === levelId);
    if (!level) return 0;
    return (level.completedWords / level.totalWords) * 100;
  }

  startTutorial(): void {
    this.router.navigate(['/practice/tutorial']);
  }
}
