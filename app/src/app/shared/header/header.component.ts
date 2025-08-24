import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, SupportedLanguage } from '../language.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AuthModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logoPath = '/logo.png';
  isAuthModalOpen = false;
  isLoginMode = true; // Nuevo estado para controlar el modo del modal
  username: string | null = localStorage.getItem('auth_user');

  constructor(public langService: LanguageService, private router: Router) {}

  onLoginClick(event: Event) {
    event.preventDefault();
    this.isLoginMode = true;
    this.isAuthModalOpen = true;
  }

  onSignupClick(event: Event) {
    event.preventDefault();
    this.isLoginMode = false;
    this.isAuthModalOpen = true;
  }

  onAuthModalClose() {
    this.isAuthModalOpen = false;
    this.username = localStorage.getItem('auth_user');
  }

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

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  onLogout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.username = null;
    this.router.navigateByUrl('/');
  }


}
