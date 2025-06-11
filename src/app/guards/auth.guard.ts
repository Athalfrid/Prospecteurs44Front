import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Vérifie les rôles si la route en spécifie
  if (route.data && route.data['roles']) {
    const requiredRoles = route.data['roles'] as string[];
    // Si tu as défini une hiérarchie et que tu veux vérifier un niveau minimum:
    const hasPermission = requiredRoles.some((r) => authService.hasMinRole(r)); // Vérifie si l'utilisateur a au moins un des niveaux requis
    // Ou si tu veux juste qu'il ait UN des rôles exacts spécifiés:
    // const hasPermission = requiredRoles.some(r => authService.hasRole(r));
    if (hasPermission) {
      return true;
    } else {
      router.navigate(['/access-denied']);
      return false;
    }
  }

  return true;
};

// Autre exemple de guard si tu as besoin de vérifier des rôles spécifiques
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.hasRole('admin')) {
    return true;
  } else {
    router.navigate(['/access-denied']);
    return false;
  }
};
