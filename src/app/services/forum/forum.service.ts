import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TopicDTO } from '../../dto/forum/TopicDTO';
import { TopicMessagesCreateDTO } from '../../dto/forum/TopicMessagesCreateDTO';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private forumApiUrl = `${environment.apiBaseUrl}/forum`;
  private topicsApiUrl = `${environment.apiBaseUrl}/topics`;

  constructor(private http: HttpClient) {}

  //Récupérer les topics
  getTopics():Observable<any>{
    return this.http.get(`${this.forumApiUrl}`)
  }

  // Exemple : créer un topic via /api/forum
  createTopic(topicDTO: TopicDTO): Observable<any> {
    return this.http.post(`${this.forumApiUrl}`, topicDTO);
  }

  // Mettre à jour un topic via /api/topics/{id}
  updateTopic(id: number, topicDTO: TopicDTO): Observable<any> {
    return this.http.put(`${this.topicsApiUrl}/${id}`, topicDTO);
  }

  // Fermer un topic (supposons via POST /api/topics/{id}/close)
  closeTopic(id: number): Observable<any> {
    return this.http.post(`${this.topicsApiUrl}/${id}/close`, {});
  }

  //Récupérer les messages d'un topic
  getMessagesByTopic(topicID:number):Observable<any>{
    return this.http.get(`${this.topicsApiUrl}/${topicID}/messages`)
  }

  // Poster un message dans un topic via /api/topics/{topicId}/messages
  postMessage(topicId: number, messageDTO: TopicMessagesCreateDTO): Observable<any> {
    return this.http.post(
      `${this.topicsApiUrl}/${topicId}/messages`,
      messageDTO
    );
  }

  // Signaler un message via /api/messages/{messageId}/report
  reportMessage(messageId: number): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/api/messages/${messageId}/report`,
      {}
    );
  }
}
