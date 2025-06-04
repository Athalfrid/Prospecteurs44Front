import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service pour interagir avec l'API de géolocalisation du gouvernement français.
 * Permet de récupérer les villes (communes) en fonction d’un code postal.
 *
 * Documentation de l’API utilisée :
 * https://geo.api.gouv.fr/adresse
 */
@Injectable({ providedIn: 'root' })
export class GeoService {
  constructor(private http: HttpClient) {}

  /**
   * Récupère les noms des communes associées à un code postal donné.
   *
   * @param codePostal - Le code postal à rechercher (5 chiffres).
   * @returns Un Observable contenant un tableau d’objets de type :
   *          [{ nom: 'Nom de la ville' }, ...]
   *
   * Exemple de réponse de l’API :
   * [
   *   { "nom": "Nantes" },
   *   { "nom": "Saint-Herblain" }
   * ]
   *
   * Si aucun résultat, retourne un tableau vide.
   */
  getVilles(codePostal: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=nom&format=json`
    );
  }
}
