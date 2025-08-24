import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Word, Level, QuizQuestion, UserProgress } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private currentScreen = new BehaviorSubject<string>('home');
  private currentLevel = new BehaviorSubject<string>('basico');
  private currentWordIndex = new BehaviorSubject<number>(0);
  private currentQuestionIndex = new BehaviorSubject<number>(0);

  // Datos de ejemplo
  private words: Word[] = [
    { id: '1', text: 'Apple', image: '🍎', context: 'I eat an apple', level: 'basico' },
    { id: '2', text: 'Dog', image: '🐕', context: 'The dog barks', level: 'basico' },
    { id: '3', text: 'Car', image: '🚗', context: 'I drive a car', level: 'basico' },
    { id: '4', text: 'House', image: '🏠', context: 'My house is big', level: 'basico' },
    { id: '5', text: 'Book', image: '📚', context: 'I read a book', level: 'basico' },
  ];

  private levels: Level[] = [
    {
      id: 'basico',
      name: 'Básico',
      description: '500 palabras fundamentales',
      totalWords: 500,
      completedWords: 175,
      isLocked: false,
      icon: '🌱'
    },
    {
      id: 'intermedio',
      name: 'Intermedio',
      description: '1000 palabras adicionales',
      totalWords: 1000,
      completedWords: 0,
      isLocked: true,
      icon: '🌿',
      requiredLevel: 'basico'
    },
    {
      id: 'avanzado',
      name: 'Avanzado',
      description: '1500 palabras especializadas',
      totalWords: 1500,
      completedWords: 0,
      isLocked: true,
      icon: '🌳',
      requiredLevel: 'intermedio'
    },
    {
      id: 'experto',
      name: 'Experto',
      description: '2000 palabras académicas/profesionales',
      totalWords: 2000,
      completedWords: 0,
      isLocked: true,
      icon: '🏆',
      requiredLevel: 'avanzado'
    }
  ];

  private userProgress: UserProgress = {
    wordsLearned: 47,
    currentStreak: 5,
    totalTime: 2.3,
    examsPassed: 3,
    levels: {
      basico: 35,
      intermedio: 0,
      avanzado: 0,
      experto: 0
    },
    difficultWords: []
  };

  constructor() {}

  // Getters
  getCurrentScreen(): Observable<string> {
    return this.currentScreen.asObservable();
  }

  getCurrentLevel(): Observable<string> {
    return this.currentLevel.asObservable();
  }

  getCurrentWordIndex(): Observable<number> {
    return this.currentWordIndex.asObservable();
  }

  getCurrentQuestionIndex(): Observable<number> {
    return this.currentQuestionIndex.asObservable();
  }

  // Métodos de navegación
  navigateTo(screen: string): void {
    this.currentScreen.next(screen);
  }

  setLevel(levelId: string): void {
    this.currentLevel.next(levelId);
  }

  // Métodos para palabras
  getWordsByLevel(level: string): Word[] {
    return this.words.filter(word => word.level === level);
  }

  getCurrentWord(level: string, index: number): Word | null {
    const words = this.getWordsByLevel(level);
    return words[index] || null;
  }

  // Métodos para progreso
  getUserProgress(): UserProgress {
    return this.userProgress;
  }

  // Métodos para niveles
  getLevels(): Level[] {
    return this.levels;
  }

  getLevelById(levelId: string): Level | undefined {
    return this.levels.find(level => level.id === levelId);
  }

  // Métodos para exámenes
  generateQuiz(level: string, questionCount: number = 10): QuizQuestion[] {
    // Implementar lógica para generar preguntas
    return [];
  }

  // Métodos para manejar palabras difíciles
  markAsDifficult(wordId: string): void {
    if (!this.userProgress.difficultWords.includes(wordId)) {
      this.userProgress.difficultWords.push(wordId);
    }
  }

  removeFromDifficult(wordId: string): void {
    this.userProgress.difficultWords = this.userProgress.difficultWords.filter(id => id !== wordId);
  }
}
