import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment, Route } from '@angular/router';

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const isAuth = !!localStorage.getItem('auth_token');
  if (!isAuth) {
    const router = inject(Router);
    router.navigateByUrl('/');
    return false;
  }
  return true;
};


