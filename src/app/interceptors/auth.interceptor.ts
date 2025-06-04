import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Si un token existe, clonage de la requête et ajout l'en-tête Authorization
  if (authToken) {
    console.log('Ajout du token Authorization',authToken);
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(cloned);
  }

  // Si pas de token, passe la requête originale
  return next(req);
};