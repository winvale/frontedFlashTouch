import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(public langService: LanguageService) {}

  get titleText() {
    return this.langService.currentLang === 'es' ?
      'Aprende Idiomas con Tus Cinco Sentidos' :
      'Learn Languages with Your Five Senses';
  }

  get descriptionText() {
    return this.langService.currentLang === 'es' ?
      'Plataforma de aprendizaje visual revolucionaria que aprovecha la neurociencia para ayudarte a dominar el vocabulario más rápido a través de técnicas de memoria basadas en imágenes.' :
      'Revolutionary visual learning platform that leverages neuroscience to help you master vocabulary faster through image-based memory techniques.';
  }

  get buttonText() {
    return this.langService.currentLang === 'es' ?
      'Comienza a Aprender Ahora' :
      'Start Learning Now';
  }
}
