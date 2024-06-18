import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuneralHome } from 'src/app/models/funeral-home/funeral-home.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuneralHomeService {

  constructor(private http: HttpClient) { }

  list(): Observable<FuneralHome[]> {
    return this.http.get<FuneralHome[]>(`${environment.url_ms_negocio}/funeralHomes`);
  }
  listByCity(id:number): Observable<FuneralHome[]> {
    return this.http.get<FuneralHome[]>(`${environment.url_ms_negocio}/funeralHomes/city/${id}`);
  }
  view(id:number): Observable<FuneralHome>{
    return this.http.get<FuneralHome>(`${environment.url_ms_negocio}/funeralHomes/${id}`);
  }
  create(newFuneralHome: FuneralHome): Observable<FuneralHome>{
    return this.http.post<FuneralHome>(`${environment.url_ms_negocio}/funeralHomes`, newFuneralHome);
  }
  update(theFuneralHome: FuneralHome): Observable<FuneralHome>{    
    const id = theFuneralHome.id;
    theFuneralHome.id = undefined;
    return this.http.put<FuneralHome>(`${environment.url_ms_negocio}/funeralHomes/${id}`, theFuneralHome);
  }
  delete(id:number){
    return this.http.delete<FuneralHome>(`${environment.url_ms_negocio}/funeralHomes/${id}`);
  }

}
