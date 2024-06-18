import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Burial } from 'src/app/models/burial/burial.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BurialService {

  constructor(private http: HttpClient) { }

  list(): Observable<Burial[]> {
    return this.http.get<Burial[]>(`${environment.url_ms_negocio}/burials`);
  }
  listByService(id:number): Observable<Burial[]> {
    return this.http.get<Burial[]>(`${environment.url_ms_negocio}/burials/service/${id}`);
  }
  view(id: number): Observable<Burial> {
    return this.http.get<Burial>(`${environment.url_ms_negocio}/burials/${id}`);
  }
  create(newBurial: Burial): Observable<Burial> {
    return this.http.post<Burial>(`${environment.url_ms_negocio}/burials`, newBurial);
  }
  update(theBurial: Burial): Observable<Burial> {
    const id = theBurial.id;
    theBurial.id = undefined;
    return this.http.put<Burial>(`${environment.url_ms_negocio}/burials/${id}`, theBurial);
  }
  delete(id: number) {
    return this.http.delete<Burial>(`${environment.url_ms_negocio}/burials/${id}`);
  }

}
