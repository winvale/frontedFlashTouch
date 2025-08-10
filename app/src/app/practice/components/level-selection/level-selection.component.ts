import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Level } from '../../models/word.model';

@Component({
  selector: 'app-level-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="level-selection">
      <h2>Selecciona tu Nivel</h2>
      <button class="btn btn-secondary" (click)="goBack()">← Volver</button>
      
      <div *ngFor="let level of levels" 
           class="level-card" 
           [class.locked]="level.isLocked"
           (click)="selectLevel(level)">
        <h3>{{ level.icon }} {{ level.name }}</h3>
        <p>{{ level.description }}</p>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="getLevelProgress(level.id)"></div>
        </div>
        <small>{{ level.completedWords }}/{{ level.totalWords }} palabras completadas</small>
        <div *ngIf="level.isLocked" class="locked-message">
          🔒 {{ level.requiredLevel ? 'Completa el nivel ' + level.requiredLevel : 'Requiere Plan Premium' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .level-selection {
      padding: 20px;
    }
    
    .level-card {
      background: linear-gradient(135deg, #1dd1a1, #10ac84);
      color: white;
      padding: 25px;
      border-radius: 15px;
      margin: 20px 0;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(29, 209, 161, 0.2);
    }
    
    .level-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(29, 209, 161, 0.3);
    }
    
    .level-card.locked {
      opacity: 0.6;
      background: #95a5a6;
      cursor: not-allowed;
    }
    
    .progress-bar {
      background: rgba(255, 255, 255, 0.2);
      height: 10px;
      border-radius: 5px;
      margin: 15px 0;
      overflow: hidden;
    }
    
    .progress-fill {
      background: white;
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .locked-message {
      margin-top: 10px;
      font-size: 0.9em;
      opacity: 0.9;
    }
  `]
})
export class LevelSelectionComponent implements OnInit {
  levels: Level[] = [];

  constructor(
    private practiceService: PracticeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.levels = this.practiceService.getLevels();
  }

  selectLevel(level: Level): void {
    if (level.isLocked) return;
    this.practiceService.setLevel(level.id);
    this.router.navigate(['/practice/level', level.id]);
  }

  goBack(): void {
    this.router.navigate(['/practice']);
  }

  getLevelProgress(levelId: string): number {
    const level = this.levels.find(l => l.id === levelId);
    if (!level) return 0;
    return (level.completedWords / level.totalWords) * 100;
  }
}
