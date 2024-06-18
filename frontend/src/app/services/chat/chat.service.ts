import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/chat/chat.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  list(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url_ms_negocio}/chats`);
  }
  listByViewing(id:number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url_ms_negocio}/chats/viewing/${id}`);
  }
  view(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${environment.url_ms_negocio}/chats/${id}`);
  }
  create(newChat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${environment.url_ms_negocio}/chats`, newChat);
  }
  update(theChat: Chat): Observable<Chat> {
    const id = theChat.id;
    theChat.id = undefined;
    return this.http.put<Chat>(`${environment.url_ms_negocio}/chats/${id}`, theChat);
  }
  delete(id: number) {
    return this.http.delete<Chat>(`${environment.url_ms_negocio}/chats/${id}`);
  }

}
