import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  constructor(public langService: LanguageService) {}

  get titleText() {
    return this.langService.currentLang === 'es' ? 'Elige Tu Plan' : 'Choose Your Plan';
  }

  get plans() {
    return this.langService.currentLang === 'es' ? [
      {
        name: 'Gratis',
        price: '$0',
        priceUnit: '/mes',
        features: [
          { text: 'Acceso a nivel básico', ok: true },
          { text: '500 palabras', ok: true },
          { text: '2 exámenes por día', ok: true },
          { text: 'Soporta anuncios', ok: false },
          { text: 'Estadísticas limitadas', ok: false }
        ],
        button: 'Comenzar'
      },
      {
        name: 'Premium',
        price: '$9.99',
        priceUnit: '/mes',
        features: [
          { text: 'Todos los niveles desbloqueados', ok: true },
          { text: 'Más de 4,000 palabras', ok: true },
          { text: 'Exámenes ilimitados', ok: true },
          { text: 'Sin anuncios', ok: true },
          { text: 'Analíticas avanzadas', ok: true },
          { text: 'Modo sin conexión', ok: true }
        ],
        button: 'Hazte Premium'
      }
    ] : [
      {
        name: 'Free',
        price: '$0',
        priceUnit: '/month',
        features: [
          { text: 'Basic level access', ok: true },
          { text: '500 words', ok: true },
          { text: '2 exams per day', ok: true },
          { text: 'Ads supported', ok: false },
          { text: 'Limited statistics', ok: false }
        ],
        button: 'Get Started'
      },
      {
        name: 'Premium',
        price: '$9.99',
        priceUnit: '/month',
        features: [
          { text: 'All levels unlocked', ok: true },
          { text: '4,000+ words', ok: true },
          { text: 'Unlimited exams', ok: true },
          { text: 'Ad-free experience', ok: true },
          { text: 'Advanced analytics', ok: true },
          { text: 'Offline mode', ok: true }
        ],
        button: 'Go Premium'
      }
    ];
  }
}

