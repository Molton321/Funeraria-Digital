import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deceased } from 'src/app/models/deceased/deceased.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeceasedService {

  constructor(private http: HttpClient) { }

  list(): Observable<Deceased[]> {
    return this.http.get<Deceased[]>(`${environment.url_ms_negocio}/deceaseds`);
  }
  listByClient(id:number): Observable<Deceased[]> {
    return this.http.get<Deceased[]>(`${environment.url_ms_negocio}/deceaseds/client/${id}`);
  }
  view(id: number): Observable<Deceased> {
    return this.http.get<Deceased>(`${environment.url_ms_negocio}/deceaseds/${id}`);
  }
  create(newDeceased: Deceased): Observable<Deceased> {
    return this.http.post<Deceased>(`${environment.url_ms_negocio}/deceaseds`, newDeceased);
  }
  update(theDeceased: Deceased): Observable<Deceased> {
    const id = theDeceased.id;
    theDeceased.id = undefined;
    return this.http.put<Deceased>(`${environment.url_ms_negocio}/deceaseds/${id}`, theDeceased);
  }
  delete(id: number) {
    return this.http.delete<Deceased>(`${environment.url_ms_negocio}/deceaseds/${id}`);
  }

}
