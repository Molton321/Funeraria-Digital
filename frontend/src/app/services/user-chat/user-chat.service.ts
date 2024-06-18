import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserChat } from 'src/app/models/user-chat/user-chat.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  constructor(private http: HttpClient) { }

  list(): Observable<UserChat[]> {
    return this.http.get<UserChat[]>(`${environment.url_ms_negocio}/userChats`);
  }
  listByUser(id:number): Observable<UserChat[]> {
    return this.http.get<UserChat[]>(`${environment.url_ms_negocio}/userChats/user/${id}`);
  }
  listByChat(id:number): Observable<UserChat[]> {
    return this.http.get<UserChat[]>(`${environment.url_ms_negocio}/userChats/chat/${id}`);
  }
  listByChatAndUser(idChat:number, idUser:number): Observable<UserChat[]> {
    return this.http.get<UserChat[]>(`${environment.url_ms_negocio}/userChats/chat/${idChat}/user/${idUser}`);
  }
  view(id:number): Observable<UserChat>{
    return this.http.get<UserChat>(`${environment.url_ms_negocio}/userChats/${id}`);
  }
  create(newUserChat: UserChat): Observable<UserChat>{
    return this.http.post<UserChat>(`${environment.url_ms_negocio}/userChats`, newUserChat);
  }
  update(theUserChat: UserChat): Observable<UserChat>{    
    const id = theUserChat.id;
    theUserChat.id = undefined;
    return this.http.put<UserChat>(`${environment.url_ms_negocio}/userChats/${id}`, theUserChat);
  }
  delete(id:number){
    return this.http.delete<UserChat>(`${environment.url_ms_negocio}/userChats/${id}`);
  }

}
