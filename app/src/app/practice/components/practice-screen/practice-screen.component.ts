import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-practice-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice-screen.component.html',
  styleUrls: ['./practice-screen.component.css']
})
export class PracticeScreenComponent implements OnInit {
  currentLevel: string = '';
  currentWordIndex: number = 0;
  words: Word[] = [];
  currentWord: Word | null = null;
  progress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private practiceService: PracticeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentLevel = params['level'];
      this.loadWords();
    });
  }

  loadWords(): void {
    this.words = this.practiceService.getWordsByLevel(this.currentLevel);
    this.updateCurrentWord();
  }

  updateCurrentWord(): void {
    this.currentWord = this.words[this.currentWordIndex] || null;
    this.progress = ((this.currentWordIndex + 1) / this.words.length) * 100;
  }

  nextWord(): void {
    if (this.isLastWord) {
      this.router.navigate(['/practice']);
      return;
    }
    this.currentWordIndex++;
    this.updateCurrentWord();
  }

  previousWord(): void {
    if (this.currentWordIndex > 0) {
      this.currentWordIndex--;
      this.updateCurrentWord();
    }
  }

  playAudio(): void {
    if (this.currentWord?.audio) {
      // Implementar reproducción de audio
      console.log('Reproduciendo audio para:', this.currentWord.text);
    }
  }

  markAsDifficult(): void {
    if (this.currentWord) {
      this.practiceService.markAsDifficult(this.currentWord.id);
      // Mostrar feedback al usuario
      console.log('Palabra marcada como difícil:', this.currentWord.text);
    }
  }

  goBack(): void {
    this.router.navigate(['/practice/levels']);
  }

  get isLastWord(): boolean {
    return this.currentWordIndex === this.words.length - 1;
  }
}
