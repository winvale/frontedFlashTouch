import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'auth_token';
  private readonly usernameKey = 'auth_user';

  private authenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  get isAuthenticated$(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  get isAuthenticated(): boolean {
    return this.authenticated$.value;
  }

  login(username: string, password: string): Observable<boolean> {
    const isValid = username === 'prueba01' && password === 'prueba01';
    if (isValid) {
      // Token dummy para indicar sesión iniciada
      localStorage.setItem(this.storageKey, 'dummy-token');
      localStorage.setItem(this.usernameKey, username);
      this.authenticated$.next(true);
    } else {
      this.logout();
    }
    return of(isValid);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.usernameKey);
    this.authenticated$.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}


