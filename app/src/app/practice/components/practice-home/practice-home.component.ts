import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PracticeService } from '../../services/practice.service';
import { Level } from '../../models/word.model';

@Component({
  selector: 'app-practice-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-home.component.html',
  styleUrls: ['./practice-home.component.css']
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
