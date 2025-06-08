import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlerteSosDTO } from '../../dto/alerte-sos.dto';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlerteSosService {
  constructor(private http: HttpClient) {}

  createAlerte(alerteDTO: AlerteSosDTO): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/alertesos`, alerteDTO);
  }

  getAllAlerts(): Observable<any>{
    return this.http.get(`${environment.apiBaseUrl}/alertesos`)
  }

  participateToAlert(id:number):Observable<any>{
    return this.http.post(`${environment.apiBaseUrl}/alertesos/${id}/contactParticipation`,{});
  }
}
