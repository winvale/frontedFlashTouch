import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { UserProgress, Level } from '../../models/word.model';

@Component({
  selector: 'app-progress-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-screen.component.html',
  styleUrls: ['./progress-screen.component.css']
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
