import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campus } from 'src/app/models/campus/campus.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  constructor(private http: HttpClient) { }

  list(): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${environment.url_ms_negocio}/campuses`);
  }
  view(id: number): Observable<Campus> {
    return this.http.get<Campus>(`${environment.url_ms_negocio}/campuses/${id}`);
  }
  create(newCampus: Campus): Observable<Campus> {
    return this.http.post<Campus>(`${environment.url_ms_negocio}/campuses`, newCampus);
  }
  update(theCampus: Campus): Observable<Campus> {
    const id = theCampus.id;
    theCampus.id = undefined;
    return this.http.put<Campus>(`${environment.url_ms_negocio}/campuses/${id}`, theCampus);
  }
  delete(id: number) {
    return this.http.delete<Campus>(`${environment.url_ms_negocio}/campuses/${id}`);
  }

}
