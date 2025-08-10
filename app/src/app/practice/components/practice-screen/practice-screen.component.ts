import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Word } from '../../models/word.model';

@Component({
  selector: 'app-practice-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="practice-screen">
      <div class="header">
        <button class="btn btn-secondary" (click)="goBack()">← Volver</button>
        <div class="level-info">
          {{ currentLevel | titlecase }} - {{ currentWordIndex + 1 }} / {{ words.length }}
        </div>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" [style.width.%]="progress"></div>
      </div>

      <div class="word-display">
        <div class="word-image">
          {{ currentWord?.image }}
        </div>
        <div class="word-text">{{ currentWord?.text }}</div>
        <div class="word-context">"{{ currentWord?.context }}"</div>
        <button class="btn btn-audio" (click)="playAudio()">
          🔊 Pronunciar
        </button>
      </div>

      <div class="actions">
        <button class="btn btn-secondary" 
                (click)="previousWord()" 
                [disabled]="currentWordIndex === 0">
          ← Anterior
        </button>
        <button class="btn btn-warning" (click)="markAsDifficult()">
          ⭐ Marcar como Difícil
        </button>
        <button class="btn btn-primary" (click)="nextWord()">
          {{ isLastWord ? 'Finalizar' : 'Siguiente' }} →
        </button>
      </div>
    </div>
  `,
  styles: [`
    .practice-screen {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .level-info {
      font-size: 1.1em;
      font-weight: 500;
    }
    
    .progress-bar {
      background: #e0e0e0;
      height: 10px;
      border-radius: 5px;
      margin: 20px 0;
      overflow: hidden;
    }
    
    .progress-fill {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .word-display {
      background: white;
      border-radius: 15px;
      padding: 40px;
      text-align: center;
      margin: 30px 0;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .word-image {
      font-size: 100px;
      margin-bottom: 20px;
    }
    
    .word-text {
      font-size: 2.5em;
      font-weight: bold;
      color: #2d3436;
      margin: 20px 0;
    }
    
    .word-context {
      font-style: italic;
      color: #636e72;
      font-size: 1.2em;
      margin: 20px 0;
    }
    
    .btn-audio {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 50px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 10px;
    }
    
    .btn-audio:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(29, 209, 161, 0.3);
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    
    .btn {
      padding: 12px 25px;
      border: none;
      border-radius: 50px;
      font-size: 1em;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn-secondary {
      background: #e0e0e0;
      color: #333;
    }
    
    .btn-primary {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      color: white;
    }
    
    .btn-warning {
      background: linear-gradient(45deg, #ffa502, #ff6348);
      color: white;
    }
  `]
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
