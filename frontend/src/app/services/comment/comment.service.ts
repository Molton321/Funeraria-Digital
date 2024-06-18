import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  list(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comments`);
  }
  listByServiceExecution(id:number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comments/serviceExecution/${id}`);
  }
  listByDeceased(id:number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comments/deceased/${id}`);
  }
  listByClient(id:number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comments/client/${id}`);
  }
  listByService(id:number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comments/service/${id}`);
  }
  view(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.url_ms_negocio}/comments/${id}`);
  }
  create(newComment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${environment.url_ms_negocio}/comments`, newComment);
  }
  update(theComment: Comment): Observable<Comment> {
    const id = theComment.id;
    theComment.id = undefined;
    return this.http.put<Comment>(`${environment.url_ms_negocio}/comments/${id}`, theComment);
  }
  delete(id: number) {
    return this.http.delete<Comment>(`${environment.url_ms_negocio}/comments/${id}`);
  }

}
