export interface Word {
  id: string;
  text: string;
  image: string;
  context: string;
  audio?: string;
  isDifficult?: boolean;
  level: 'basico' | 'intermedio' | 'avanzado' | 'experto';
}

export interface Level {
  id: 'basico' | 'intermedio' | 'avanzado' | 'experto';
  name: string;
  description: string;
  totalWords: number;
  completedWords: number;
  isLocked: boolean;
  icon: string;
  requiredLevel?: 'basico' | 'intermedio' | 'avanzado' | 'experto';
}

export interface QuizQuestion {
  id: string;
  word: Word;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface UserProgress {
  wordsLearned: number;
  currentStreak: number;
  totalTime: number; // en minutos
  examsPassed: number;
  levels: {
    basico: number;
    intermedio: number;
    avanzado: number;
    experto: number;
  };
  difficultWords: string[];
}
