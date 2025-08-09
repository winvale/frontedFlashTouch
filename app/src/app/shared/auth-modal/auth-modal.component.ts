import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService, SupportedLanguage } from '../language.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() isLoginMode = true;
  @Output() close = new EventEmitter<void>();
  
  loginData = {
    email: '',
    password: ''
  };
  
  // true para login, false para registro
  isLoading = false;
  error: string | null = null;
  currentLang: SupportedLanguage = 'es';
  
  // Textos traducibles
  translations = {
    loginTitle: { es: 'Iniciar Sesión', en: 'Log In' },
    signupTitle: { es: 'Crear Cuenta', en: 'Create Account' },
    email: { es: 'Correo Electrónico', en: 'Email' },
    password: { es: 'Contraseña', en: 'Password' },
    emailRequired: { es: 'Por favor ingresa un correo electrónico', en: 'Please enter an email' },
    emailInvalid: { es: 'Por favor ingresa un correo electrónico válido', en: 'Please enter a valid email' },
    passwordRequired: { es: 'Por favor ingresa una contraseña', en: 'Please enter a password' },
    passwordMinLength: { es: 'La contraseña debe tener al menos 6 caracteres', en: 'Password must be at least 6 characters' },
    loginButton: { es: 'Iniciar Sesión', en: 'Log In' },
    signupButton: { es: 'Registrarse', en: 'Sign Up' },
    loading: { es: 'Cargando...', en: 'Loading...' },
    noAccount: { es: '¿No tienes cuenta? ', en: "Don't have an account? "},
    haveAccount: { es: '¿Ya tienes cuenta? ', en: 'Already have an account? '},
    signupLink: { es: 'Regístrate', en: 'Sign Up' },
    loginLink: { es: 'Inicia Sesión', en: 'Log In' },
    or: { es: 'o', en: 'or' },
    loginWithGoogle: { es: 'Iniciar sesión con Google', en: 'Sign in with Google' },
    signupWithGoogle: { es: 'Registrarse con Google', en: 'Sign up with Google' }
  };
  
  constructor(private languageService: LanguageService) {}
  
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.currentLang = this.languageService.currentLang;
    this.languageService.lang$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((lang: SupportedLanguage) => {
      this.currentLang = lang;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClose() {
    this.close.emit();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    // Limpiar los campos al cambiar de modo
    this.loginData = { email: '', password: '' };
  }

  onSubmit() {
    // Aquí iría la lógica de autenticación
    this.isLoading = true;
    this.error = null;
    
    // Simulando una llamada a la API
    setTimeout(() => {
      console.log('Datos de autenticación:', this.loginData);
      this.isLoading = false;
      // this.close.emit(); // Descomentar para cerrar automáticamente al autenticar
    }, 1000);
  }

  // Evita que el clic en el modal se propague al fondo
  onModalClick(event: Event) {
    event.stopPropagation();
  }
}
