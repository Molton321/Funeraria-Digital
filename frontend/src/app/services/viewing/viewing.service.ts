import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viewing } from 'src/app/models/viewing/viewing.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewingService {

  constructor(private http: HttpClient) { }

  list(): Observable<Viewing[]> {
    return this.http.get<Viewing[]>(`${environment.url_ms_negocio}/viewings`);
  }
  view(id: number): Observable<Viewing> {
    return this.http.get<Viewing>(`${environment.url_ms_negocio}/viewings/${id}`);
  }
  create(newViewing: Viewing): Observable<Viewing> {
    return this.http.post<Viewing>(`${environment.url_ms_negocio}/viewings`, newViewing);
  }
  update(theViewing: Viewing): Observable<Viewing> {
    const id = theViewing.id;
    theViewing.id = undefined;
    return this.http.put<Viewing>(`${environment.url_ms_negocio}/viewings/${id}`, theViewing);
  }
  delete(id: number) {
    return this.http.delete<Viewing>(`${environment.url_ms_negocio}/viewings/${id}`);
  }

}
