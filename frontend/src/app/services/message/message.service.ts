import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message/message.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  list(): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/messages`);
  }
  listByUserChat(id:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/messages/userChat/${id}`);
  }
  listByChat(id:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/messages/chat/${id}`);
  }
  listByUser(id:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/messages/user/${id}`);
  }
  listByUserAndChat(idUser:number, idChat:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.url_ms_negocio}/messages/user/${idUser}/chat/${idChat}`);
  }
  view(id:number): Observable<Message>{
    return this.http.get<Message>(`${environment.url_ms_negocio}/messages/${id}`);
  }
  create(newMessage: Message): Observable<Message>{
    return this.http.post<Message>(`${environment.url_ms_negocio}/messages`, newMessage);
  }
  update(theMessage: Message): Observable<Message>{    
    const id = theMessage.id;
    theMessage.id = undefined;
    return this.http.put<Message>(`${environment.url_ms_negocio}/messages/${id}`, theMessage);
  }
  delete(id:number){
    return this.http.delete<Message>(`${environment.url_ms_negocio}/messages/${id}`);
  }

}
