import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { UserProgress, Level } from '../../models/word.model';

@Component({
  selector: 'app-progress-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-screen">
      <div class="header">
        <h2>Mi Progreso</h2>
        <button class="btn btn-secondary" (click)="goBack()">← Volver</button>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ userProgress.wordsLearned }}</div>
          <div class="stat-label">Palabras Aprendidas</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">{{ userProgress.currentStreak }} días</div>
          <div class="stat-label">Racha Actual</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">{{ userProgress.totalTime }}h</div>
          <div class="stat-label">Tiempo de Estudio</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value">{{ userProgress.examsPassed }}</div>
          <div class="stat-label">Exámenes Aprobados</div>
        </div>
      </div>
      
      <div class="levels-progress">
        <h3>Progreso por Nivel</h3>
        <div *ngFor="let level of levels" class="level-progress">
          <div class="level-header">
            <span class="level-name">{{ level.icon }} {{ level.name }}</span>
            <span class="level-percentage">{{ getLevelCompletion(level.id) }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="getLevelCompletion(level.id)"></div>
          </div>
          <div class="level-stats">
            <span>{{ getCompletedWords(level.id) }} de {{ level.totalWords }} palabras</span>
            <span>•</span>
            <span>{{ getDaysStudied(level.id) }} días</span>
          </div>
        </div>
      </div>
      
      <div class="difficult-words" *ngIf="userProgress.difficultWords.length > 0">
        <h3>Palabras Difíciles</h3>
        <div class="words-list">
          <div class="word-tag" *ngFor="let wordId of userProgress.difficultWords">
            {{ getWordText(wordId) }}
            <button class="btn-remove" (click)="removeDifficultWord(wordId)">×</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-screen {
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
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .stat-card {
      background: white;
      border-radius: 15px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }
    
    .stat-value {
      font-size: 2.5em;
      font-weight: bold;
      color: #1dd1a1;
      margin-bottom: 5px;
    }
    
    .stat-label {
      color: #636e72;
      font-size: 0.95em;
    }
    
    .levels-progress {
      background: white;
      border-radius: 15px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }
    
    .level-progress {
      margin: 25px 0;
    }
    
    .level-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    
    .level-name {
      font-weight: 500;
      font-size: 1.1em;
    }
    
    .level-percentage {
      font-weight: bold;
      color: #1dd1a1;
    }
    
    .progress-bar {
      background: #e0e0e0;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin: 10px 0;
    }
    
    .progress-fill {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      height: 100%;
      border-radius: 5px;
    }
    
    .level-stats {
      display: flex;
      gap: 10px;
      color: #636e72;
      font-size: 0.9em;
    }
    
    .difficult-words {
      background: white;
      border-radius: 15px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }
    
    .words-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }
    
    .word-tag {
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 50px;
      padding: 8px 15px;
      font-size: 0.9em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn-remove {
      background: none;
      border: none;
      color: #e74c3c;
      font-size: 1.2em;
      cursor: pointer;
      padding: 0 0 0 5px;
      line-height: 1;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 50px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-secondary {
      background: #e0e0e0;
      color: #333;
    }
  `]
})
export class ProgressScreenComponent implements OnInit {
  userProgress: UserProgress;
  levels: Level[] = [];

  constructor(
    private practiceService: PracticeService,
    private router: Router
  ) {
    this.userProgress = this.practiceService.getUserProgress();
  }

  ngOnInit(): void {
    this.levels = this.practiceService.getLevels();
  }

  getLevelCompletion(levelId: string): number {
    const level = this.levels.find(l => l.id === levelId);
    if (!level) return 0;
    return Math.round((level.completedWords / level.totalWords) * 100);
  }

  getCompletedWords(levelId: string): number {
    const level = this.levels.find(l => l.id === levelId);
    return level ? level.completedWords : 0;
  }

  getDaysStudied(levelId: string): number {
    // Implementar lógica para obtener días estudiados por nivel
    return Math.floor(Math.random() * 30) + 1; // Ejemplo aleatorio
  }

  getWordText(wordId: string): string {
    // Implementar lógica para obtener el texto de la palabra por ID
    return `Palabra #${wordId}`;
  }

  removeDifficultWord(wordId: string): void {
    this.practiceService.removeFromDifficult(wordId);
    this.userProgress = this.practiceService.getUserProgress();
  }

  goBack(): void {
    this.router.navigate(['/practice']);
  }
}
