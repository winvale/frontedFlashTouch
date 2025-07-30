import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  constructor(public langService: LanguageService) {}

  get titleText() {
    return this.langService.currentLang === 'es' ?
      'Pruébalo Ahora' :
      'Try It Now';
  }

  get descriptionText() {
    return this.langService.currentLang === 'es' ?
      'Experimenta cómo FlashTouch hace que el aprendizaje sea intuitivo y divertido' :
      'Experience how FlashTouch makes learning intuitive and fun';
  }

  get cardTitle() {
    return this.langService.currentLang === 'es' ?
      'Manzana' :
      'Apple';
  }

  get cardDescription() {
    return this.langService.currentLang === 'es' ?
      'Fruta roja, bocadillo saludable' :
      'Red fruit, healthy snack';
  }

  get playButtonText() {
    return this.langService.currentLang === 'es' ?
      '🔊 Reproducir' :
      '🔊 Play';
  }

  get nextButtonText() {
    return this.langService.currentLang === 'es' ?
      '→ Siguiente' :
      '→ Next';
  }
}
