import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public langService: LanguageService) {}

  get footerText() {
    return this.langService.currentLang === 'es' ?
      ' 2024 FlashTouch. Revolucionando el aprendizaje de idiomas a través de la inteligencia visual.' :
      ' 2024 FlashTouch. Revolutionizing language learning through visual intelligence.';
  }
}
asasa
