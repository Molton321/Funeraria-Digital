import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cremation } from 'src/app/models/cremation/cremation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CremationService {
  
  constructor(private http: HttpClient) { }

  list(): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(`${environment.url_ms_negocio}/cremations`);
  }
  listByService(id:number): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(`${environment.url_ms_negocio}/cremations/service/${id}`);
  }
  view(id: number): Observable<Cremation> {
    return this.http.get<Cremation>(`${environment.url_ms_negocio}/cremations/${id}`);
  }
  create(newCremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(`${environment.url_ms_negocio}/cremations`, newCremation);
  }
  update(theCremation: Cremation): Observable<Cremation> {
    const id = theCremation.id;
    theCremation.id = undefined;
    return this.http.put<Cremation>(`${environment.url_ms_negocio}/cremations/${id}`, theCremation);
  }
  delete(id: number) {
    return this.http.delete<Cremation>(`${environment.url_ms_negocio}/cremations/${id}`);
  }

}
