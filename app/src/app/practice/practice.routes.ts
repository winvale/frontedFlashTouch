import { Routes } from '@angular/router';
import { PracticeHomeComponent } from './components/practice-home/practice-home.component';
import { PracticeLayoutComponent } from './components/practice-layout/practice-layout.component';
import { LevelSelectionComponent } from './components/level-selection/level-selection.component';
import { PracticeScreenComponent } from './components/practice-screen/practice-screen.component';
import { QuizSelectionComponent } from './components/quiz-selection/quiz-selection.component';
import { QuizScreenComponent } from './components/quiz-screen/quiz-screen.component';
import { ProgressScreenComponent } from './components/progress/progress-screen.component';
import { TutorialScreenComponent } from './components/tutorial/tutorial-screen.component';

export const PRACTICE_ROUTES: Routes = [
  {
    path: '',
    title: 'Práctica - FlashTouch',
    component: PracticeLayoutComponent,
    children: [
      { path: '', component: PracticeHomeComponent },
      { path: 'levels', component: LevelSelectionComponent, title: 'Seleccionar Nivel - FlashTouch' },
      { path: 'level/:level', component: PracticeScreenComponent, title: 'Practicar - FlashTouch' },
      { path: 'quizzes', component: QuizSelectionComponent, title: 'Exámenes - FlashTouch' },
      { path: 'quiz/:level', component: QuizScreenComponent, title: 'Examen - FlashTouch' },
      { path: 'progress', component: ProgressScreenComponent, title: 'Mi Progreso - FlashTouch' },
      { path: 'tutorial', component: TutorialScreenComponent, title: 'Tutorial - FlashTouch' },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },
 
];
