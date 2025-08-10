import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { QuizQuestion, Word } from '../../models/word.model';

@Component({
  selector: 'app-quiz-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="quiz-screen">
      <div class="header">
        <div class="quiz-info">
          <h2>Examen: {{ currentLevel | titlecase }}</h2>
          <div class="progress">Pregunta {{ currentQuestionIndex + 1 }} de {{ quizQuestions.length }}</div>
        </div>
        <div class="timer">⏱️ {{ formatTime(timeLeft) }}</div>
      </div>
      
      <div class="progress-bar">
        <div class="progress-fill" [style.width.%]="(currentQuestionIndex / quizQuestions.length) * 100"></div>
      </div>
      
      <div class="question-container" *ngIf="currentQuestion">
        <div class="question">
          <div class="question-text">{{ currentQuestion.word.text }}</div>
          <div class="question-context">"{{ currentQuestion.word.context }}"</div>
          <div class="question-image">{{ currentQuestion.word.image }}</div>
        </div>
        
        <div class="options">
          <button 
            *ngFor="let option of currentQuestion.options; let i = index"
            class="option"
            [class.selected]="selectedOption === option"
            [class.correct]="showResults && option === currentQuestion.correctAnswer"
            [class.incorrect]="showResults && selectedOption === option && selectedOption !== currentQuestion.correctAnswer"
            (click)="selectOption(option)"
            [disabled]="showResults">
            {{ option }}
          </button>
        </div>
        
        <div class="feedback" *ngIf="showResults">
          <div class="feedback-message" [class.correct]="isAnswerCorrect" [class.incorrect]="!isAnswerCorrect">
            {{ isAnswerCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😕' }}
          </div>
          <div class="explanation" *ngIf="!isAnswerCorrect">
            La respuesta correcta es: <strong>{{ currentQuestion.correctAnswer }}</strong>
          </div>
          <button class="btn btn-primary" (click)="nextQuestion()">
            {{ isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta' }}
          </button>
        </div>
      </div>
      
      <div class="results" *ngIf="showFinalResults">
        <h2>Resultados del Examen</h2>
        <div class="score">
          <div class="score-value">{{ correctAnswers }} / {{ quizQuestions.length }}</div>
          <div class="score-percentage">{{ (correctAnswers / quizQuestions.length) * 100 }}%</div>
          <div class="score-message" [class.passed]="hasPassed" [class.failed]="!hasPassed">
            {{ hasPassed ? '¡Felicidades! Has aprobado el examen.' : 'No has alcanzado el puntaje mínimo. Inténtalo de nuevo.' }}
          </div>
        </div>
        
        <div class="question-recap">
          <h3>Resumen de respuestas:</h3>
          <div class="question-item" *ngFor="let question of quizQuestions; let i = index">
            <div class="question-text">
              {{ i + 1 }}. {{ question.word.text }}: 
              <span class="user-answer" [class.correct]="question.userAnswer === question.correctAnswer"
                    [class.incorrect]="question.userAnswer !== question.correctAnswer">
                {{ question.userAnswer || 'Sin responder' }}
              </span>
              <span *ngIf="question.userAnswer !== question.correctAnswer" class="correct-answer">
                (Correcta: {{ question.correctAnswer }})
              </span>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <button class="btn btn-secondary" (click)="restartQuiz()">
            Reintentar Examen
          </button>
          <button class="btn btn-primary" (click)="finishQuiz()">
            Volver a la Práctica
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .quiz-screen {
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
    
    .quiz-info h2 {
      margin: 0;
      color: #2d3436;
    }
    
    .progress {
      color: #636e72;
      font-size: 0.9em;
    }
    
    .timer {
      background: #f8f9fa;
      padding: 8px 15px;
      border-radius: 50px;
      font-weight: bold;
      color: #2d3436;
    }
    
    .progress-bar {
      background: #e0e0e0;
      height: 8px;
      border-radius: 4px;
      margin-bottom: 30px;
      overflow: hidden;
    }
    
    .progress-fill {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .question-container {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .question {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .question-text {
      font-size: 2em;
      font-weight: bold;
      color: #2d3436;
      margin-bottom: 15px;
    }
    
    .question-context {
      font-style: italic;
      color: #636e72;
      margin-bottom: 20px;
    }
    
    .question-image {
      font-size: 80px;
      margin: 20px 0;
    }
    
    .options {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .option {
      background: #f8f9fa;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      padding: 15px 20px;
      font-size: 1.1em;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .option:hover {
      background: #f1f2f6;
      border-color: #b2bec3;
    }
    
    .option.selected {
      background: #d1f7ed;
      border-color: #1dd1a1;
      color: #10ac84;
    }
    
    .option.correct {
      background: #d4edda;
      border-color: #28a745;
      color: #155724;
    }
    
    .option.incorrect {
      background: #f8d7da;
      border-color: #dc3545;
      color: #721c24;
    }
    
    .feedback {
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    .feedback-message {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 15px;
    }
    
    .feedback-message.correct {
      color: #28a745;
    }
    
    .feedback-message.incorrect {
      color: #dc3545;
    }
    
    .explanation {
      margin: 15px 0;
      color: #6c757d;
    }
    
    .results {
      text-align: center;
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .score {
      margin: 30px 0;
    }
    
    .score-value {
      font-size: 3em;
      font-weight: bold;
      color: #2d3436;
    }
    
    .score-percentage {
      font-size: 1.5em;
      color: #636e72;
      margin: 10px 0;
    }
    
    .score-message {
      font-size: 1.2em;
      margin: 20px 0;
      padding: 15px;
      border-radius: 10px;
    }
    
    .score-message.passed {
      background: #d4edda;
      color: #155724;
    }
    
    .score-message.failed {
      background: #f8d7da;
      color: #721c24;
    }
    
    .question-recap {
      text-align: left;
      margin: 30px 0;
    }
    
    .question-item {
      margin: 15px 0;
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .user-answer {
      font-weight: bold;
    }
    
    .user-answer.correct {
      color: #28a745;
    }
    
    .user-answer.incorrect {
      color: #dc3545;
      text-decoration: line-through;
    }
    
    .correct-answer {
      color: #28a745;
      font-weight: bold;
    }
    
    .actions {
      display: flex;
      justify-content: center;
      gap: 15px;
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
    
    .btn-primary {
      background: linear-gradient(45deg, #1dd1a1, #10ac84);
      color: white;
    }
    
    .btn-secondary {
      background: #e0e0e0;
      color: #333;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class QuizScreenComponent implements OnInit {
  currentLevel: string = '';
  quizQuestions: QuizQuestion[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string | null = null;
  showResults: boolean = false;
  showFinalResults: boolean = false;
  correctAnswers: number = 0;
  timeLeft: number = 600; // 10 minutos en segundos
  timer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private practiceService: PracticeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentLevel = params['level'];
      this.startQuiz();
    });
  }

  startQuiz(): void {
    this.quizQuestions = this.practiceService.generateQuiz(this.currentLevel, 10);
    this.startTimer();
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finishQuiz();
      }
    }, 1000);
  }

  get currentQuestion(): QuizQuestion | null {
    return this.quizQuestions[this.currentQuestionIndex] || null;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.quizQuestions.length - 1;
  }

  get isAnswerCorrect(): boolean {
    if (!this.currentQuestion || this.selectedOption === null) return false;
    return this.selectedOption === this.currentQuestion.correctAnswer;
  }

  get hasPassed(): boolean {
    const passPercentage = this.correctAnswers / this.quizQuestions.length;
    return passPercentage >= 0.8; // 80% para aprobar
  }

  selectOption(option: string): void {
    if (this.showResults) return;
    this.selectedOption = option;
    
    if (this.currentQuestion) {
      this.currentQuestion.userAnswer = option;
      if (this.isAnswerCorrect) {
        this.correctAnswers++;
      }
    }
    
    this.showResults = true;
  }

  nextQuestion(): void {
    if (this.isLastQuestion) {
      this.finishQuiz();
    } else {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.showResults = false;
    }
  }

  finishQuiz(): void {
    clearInterval(this.timer);
    this.showFinalResults = true;
    // Aquí podrías guardar los resultados del cuestionario
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.showResults = false;
    this.showFinalResults = false;
    this.correctAnswers = 0;
    this.timeLeft = 600;
    this.startQuiz();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
