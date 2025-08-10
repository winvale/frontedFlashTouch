import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { QuizQuestion, Word } from '../../models/word.model';

@Component({
  selector: 'app-quiz-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-screen.component.html',
  styleUrls: ['./quiz-screen.component.css']
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
