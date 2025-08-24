import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Level } from '../../models/word.model';

@Component({
  selector: 'app-quiz-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.css']
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
