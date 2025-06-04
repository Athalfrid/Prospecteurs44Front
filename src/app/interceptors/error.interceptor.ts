import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Rediriger vers la page de connexion
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Rediriger vers la page d'accès refusé
        router.navigate(['/access-denied']);
      }
      return throwError(() => error); // Propager l'erreur pour que le composant puisse la gérer
    })
  );
};