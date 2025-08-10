import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Level } from '../../models/word.model';

@Component({
  selector: 'app-quiz-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quiz-selection">
      <h2>Exámenes de Práctica</h2>
      <button class="btn btn-secondary" (click)="goBack()">← Volver</button>
      
      <div class="quiz-cards">
        <div *ngFor="let level of levels" 
             class="quiz-card"
             [class.locked]="level.isLocked"
             (click)="selectQuiz(level.id)">
          <div class="quiz-icon">📝</div>
          <h3>{{ level.name }}</h3>
          <p>{{ level.description }}</p>
          <div class="quiz-stats">
            <span>10 preguntas</span>
            <span>•</span>
            <span>80% para aprobar</span>
          </div>
          <div *ngIf="level.isLocked" class="locked-message">
            🔒 {{ level.requiredLevel ? 'Completa el nivel ' + level.requiredLevel : 'Requiere Plan Premium' }}
          </div>
          <button class="btn btn-primary" [disabled]="level.isLocked">
            Iniciar Examen
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-selection {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .quiz-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
      margin-top: 30px;
    }
    
    .quiz-card {
      background: white;
      border-radius: 15px;
      padding: 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      border: 2px solid transparent;
    }
    
    .quiz-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      border-color: #1dd1a1;
    }
    
    .quiz-card.locked {
      opacity: 0.6;
      filter: grayscale(0.8);
      cursor: not-allowed;
    }
    
    .quiz-icon {
      font-size: 50px;
      margin-bottom: 15px;
    }
    
    .quiz-card h3 {
      color: #2d3436;
      margin: 10px 0;
    }
    
    .quiz-card p {
      color: #636e72;
      margin-bottom: 20px;
      min-height: 40px;
    }
    
    .quiz-stats {
      display: flex;
      justify-content: center;
      gap: 10px;
      color: #636e72;
      font-size: 0.9em;
      margin: 15px 0;
    }
    
    .locked-message {
      background: rgba(0,0,0,0.05);
      padding: 8px;
      border-radius: 5px;
      margin: 15px 0;
      font-size: 0.9em;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 50px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
      width: 100%;
    }
    
    .btn-primary {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      color: white;
    }
    
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-secondary {
      background: #e0e0e0;
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class QuizSelectionComponent implements OnInit {
  levels: Level[] = [];

  constructor(
    private practiceService: PracticeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.levels = this.practiceService.getLevels();
  }

  selectQuiz(levelId: string): void {
    const level = this.levels.find(l => l.id === levelId);
    if (level?.isLocked) return;
    this.router.navigate(['/practice/quiz', levelId]);
  }

  goBack(): void {
    this.router.navigate(['/practice']);
  }
}
