import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { min, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterDTO } from '../../dto/register.dto';

import { environment } from '../../../environments/environment';

/**
 * Interface représentant la structure de la réponse à l'authentification.
 */
interface AuthResponse {
  token: string;
}

interface RoleHierarchy {
  [key: string]: number; // <-- Ceci est la signature d'index !
  ROLE_USER: number;
  ROLE_MODERATEUR: number;
  ROLE_ADMIN: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Clé utilisée pour stocker le token JWT dans le localStorage */
  private tokenKey = 'jwt_token';


  /** Instance du service permettant de manipuler les JWT */
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  /**
   * Envoie les identifiants au backend pour obtenir un token JWT.
   * En cas de succès, le token est stocké localement.
   *
   * @param credentials - Objet contenant le nom d'utilisateur et le mot de passe
   * @returns Observable contenant la réponse avec le token
   */
  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    const port = 5002;
    const loginUrl = `${environment.apiBaseUrl}/user/login`;

    return this.http.post<AuthResponse>(loginUrl, credentials).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  /**
   * Supprime le token JWT du localStorage, déconnectant ainsi l'utilisateur.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  register(credentials: RegisterDTO): Observable<AuthResponse> {
    const port = 5002;
    const registerUrl = `${environment.apiBaseUrl}/user/register`;
    return this.http.post<AuthResponse>(registerUrl, credentials).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  /**
   * Récupère le token JWT stocké dans le localStorage.
   *
   * @returns Le token sous forme de chaîne ou null s'il n'existe pas
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Stocke le token JWT dans le localStorage.
   *
   * @param token - Le token JWT à enregistrer
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Vérifie si l'utilisateur est actuellement connecté,
   * en s'assurant que le token existe et qu'il n'est pas expiré.
   *
   * @returns true si l'utilisateur est connecté, false sinon
   */
  isLoggedIn(): boolean {
    const token = this.getToken();

    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Extrait les rôles de l'utilisateur à partir du token JWT décodé.
   *
   * @returns Un tableau des rôles de l'utilisateur, ou un tableau vide si non connecté
   */
  getUserRoles(): string[] {
    const token = this.getToken();

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return [];
    }

    const decodedToken = this.jwtHelper.decodeToken(token);

    //Si le claim de rôle est une seule chaîne:
    if (typeof decodedToken.role === 'string') {
      return [decodedToken.role];
    }

    //Si la claim était déjà un tableau ou si le claim a un autre nom comme 'roles' après modification du back
    if (Array.isArray(decodedToken.roles)) {
      return decodedToken.roles;
    }

    return []; //Aucun rôle trouvé ou format iattendu
  }

  /**
   * Vérifie si l'utilisateur connecté possède un rôle spécifique.
   *
   * @param role - Le rôle à vérifier
   * @returns true si l'utilisateur a le rôle, false sinon
   */
  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  }

  private roleHierarchy: RoleHierarchy = {
    ROLE_USER: 1,
    ROLE_MODERATEUR: 2,
    ROLE_ADMIN: 3,
  };

  hasMinRole(minRole: string): boolean {
    const userRoles = this.getUserRoles();
    if (!userRoles || userRoles.length === 0) {
      return false;
    }
    const userRole = userRoles[0];

    if (!(userRole in this.roleHierarchy) || !(minRole in this.roleHierarchy)) {
      console.warn(
        `Role '${userRole}' or '${minRole}' not found in roleHierarchy.`
      );
      return false;
    }

    const userLevel = this.roleHierarchy[userRole];
    const minLevel = this.roleHierarchy[minRole];

    return userLevel >= minLevel;
  }
}
