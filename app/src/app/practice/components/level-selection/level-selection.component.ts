import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Level } from '../../models/word.model';

@Component({
  selector: 'app-level-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css']
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
