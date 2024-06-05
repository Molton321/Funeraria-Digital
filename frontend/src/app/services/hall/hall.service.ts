import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hall } from 'src/app/models/hall/hall.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http: HttpClient) { }

  list(): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${environment.url_ms_negocio}/halls`);
  }

  view(id: number): Observable<Hall> {
    return this.http.get<Hall>(`${environment.url_ms_negocio}/halls/${id}`);
  }

  create(newHall: Hall): Observable<Hall> {
    return this.http.post<Hall>(`${environment.url_ms_negocio}/halls`, newHall);
  }

  update(theHall: Hall): Observable<Hall> {
    const id = theHall.id;
    theHall.id = undefined;
    return this.http.put<Hall>(`${environment.url_ms_negocio}/halls/${id}`, theHall);
  }

  delete(id: number) {
    return this.http.delete<Hall>(`${environment.url_ms_negocio}/halls/${id}`);
  }
  
}
