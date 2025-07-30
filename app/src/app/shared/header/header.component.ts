import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, SupportedLanguage } from '../language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logoPath = '/logo.png';

  constructor(public langService: LanguageService) {}

  setLanguage(lang: SupportedLanguage) {
    this.langService.setLanguage(lang);
  }

  get currentLang() {
    return this.langService.currentLang;
  }

  get navLinks() {
    return this.currentLang === 'es' ? [
      { label: 'Inicio', href: '#home' },
      { label: 'Características', href: '#features' },
      { label: 'Precios', href: '#pricing' },
      { label: 'Demo', href: '#demo' }
    ] : [
      { label: 'Home', href: '#home' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Demo', href: '#demo' }
    ];
  }

  get loginText() {
    return this.currentLang === 'es' ? 'Iniciar sesión' : 'Login';
  }
  get signupText() {
    return this.currentLang === 'es' ? 'Registrarse' : 'Sign Up';
  }

  onLoginClick(event: Event) {
    event.preventDefault();
    // TODO: Mostrar modal de login
  }

  onSignupClick(event: Event) {
    event.preventDefault();
    // TODO: Mostrar modal de registro
  }
}
