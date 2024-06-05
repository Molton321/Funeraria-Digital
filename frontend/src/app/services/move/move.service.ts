import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Move } from 'src/app/models/move/move';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  constructor(private http: HttpClient) { }

  list(): Observable<Move[]> {
    return this.http.get<Move[]>(`${environment.url_ms_negocio}/moves`);
  }
  view(id: number): Observable<Move> {
    return this.http.get<Move>(`${environment.url_ms_negocio}/moves/${id}`);
  }
  create(newMove: Move): Observable<Move> {
    return this.http.post<Move>(`${environment.url_ms_negocio}/moves`, newMove);
  }
  update(theMove: Move): Observable<Move> {
    const id = theMove.id;
    theMove.id = undefined;
    return this.http.put<Move>(`${environment.url_ms_negocio}/moves/${id}`, theMove);
  }
  delete(id: number) {
    return this.http.delete<Move>(`${environment.url_ms_negocio}/moves/${id}`);
  }
  
}
