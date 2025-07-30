import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  constructor(public langService: LanguageService) {}

  get titleText() {
    return this.langService.currentLang === 'es' ?
      'Características de Aprendizaje Poderosas' :
      'Powerful Learning Features';
  }

  get cards() {
    return this.langService.currentLang === 'es' ?
      [
        {
          icon: '/assets/levels-icon.png',
          title: '4 Niveles de Aprendizaje',
          description: 'De Básico a Experto, la dificultad progresiva asegura un desafío y crecimiento óptimos.'
        },
        {
          icon: '/assets/pronunciation-icon.png',
          title: 'Pronunciación Nativa',
          description: 'Audio de alta calidad de hablantes nativos para perfeccionar tu acento y pronunciación.'
        },
        {
          icon: '/assets/competition-icon.png',
          title: 'Modo de Competencia',
          description: 'Desbloquea niveles pasando exámenes con 100% de precisión. ¡Desafíate a ti mismo!'
        },
        {
          icon: '/assets/practice-icon.png',
          title: 'Modo de Práctica',
          description: 'Exploración libre de cualquier nivel para un aprendizaje relajado y sesiones de revisión.'
        },
        {
          icon: '/assets/responsive-icon.png',
          title: 'Diseño Responsivo',
          description: 'Aprende en cualquier dispositivo - escritorio, tableta o móvil. Tu progreso se sincroniza en todas partes.'
        },
        {
          icon: '/assets/tracking-icon.png',
          title: 'Seguimiento de Progreso',
          description: 'Análisis detallados y estadísticas para monitorear tu viaje de aprendizaje.'
        }
      ] :
      [
        {
          icon: '/assets/levels-icon.png',
          title: '4 Learning Levels',
          description: 'From Basic to Expert, progressive difficulty ensures optimal challenge and growth.'
        },
        {
          icon: '/assets/pronunciation-icon.png',
          title: 'Native Pronunciation',
          description: 'High-quality audio from native speakers to perfect your accent and pronunciation.'
        },
        {
          icon: '/assets/competition-icon.png',
          title: 'Competition Mode',
          description: 'Unlock levels by passing exams with 100% accuracy. Challenge yourself!'
        },
        {
          icon: '/assets/practice-icon.png',
          title: 'Practice Mode',
          description: 'Free exploration of any level for relaxed learning and review sessions.'
        },
        {
          icon: '/assets/responsive-icon.png',
          title: 'Responsive Design',
          description: 'Learn on any device - desktop, tablet, or mobile. Your progress syncs everywhere.'
        },
        {
          icon: '/assets/tracking-icon.png',
          title: 'Progress Tracking',
          description: 'Detailed analytics and statistics to monitor your learning journey.'
        }
      ];
  }
}
