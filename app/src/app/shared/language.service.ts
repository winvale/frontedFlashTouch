import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLanguage = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSubject = new BehaviorSubject<SupportedLanguage>('en');
  lang$ = this.langSubject.asObservable();

  setLanguage(lang: SupportedLanguage) {
    this.langSubject.next(lang);
    // Aquí podrías guardar la preferencia en localStorage si lo deseas
  }

  get currentLang(): SupportedLanguage {
    return this.langSubject.value;
  }
}
