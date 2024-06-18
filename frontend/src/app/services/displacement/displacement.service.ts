import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Displacement } from 'src/app/models/displacement/displacement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisplacementService {

  constructor(private http: HttpClient) { }

  list(): Observable<Displacement[]> {
    return this.http.get<Displacement[]>(`${environment.url_ms_negocio}/displacements`);
  }
  listByDriver(id:number): Observable<Displacement[]> {
    return this.http.get<Displacement[]>(`${environment.url_ms_negocio}/displacements/driver/${id}`);
  }
  listByCoffin(id:number): Observable<Displacement[]> {
    return this.http.get<Displacement[]>(`${environment.url_ms_negocio}/displacements/coffin/${id}`);
  }
  listByDriverAndCoffin(idDriver:number, idCoffin:number): Observable<Displacement[]> {
    return this.http.get<Displacement[]>(`${environment.url_ms_negocio}/displacements/driver/${idDriver}/coffin/${idCoffin}`);
  }
  view(id:number): Observable<Displacement>{
    return this.http.get<Displacement>(`${environment.url_ms_negocio}/displacements/${id}`);
  }
  create(newDisplacement: Displacement): Observable<Displacement>{
    return this.http.post<Displacement>(`${environment.url_ms_negocio}/displacements`, newDisplacement);
  }
  update(theDisplacement: Displacement): Observable<Displacement>{    
    const id = theDisplacement.id;
    theDisplacement.id = undefined;
    return this.http.put<Displacement>(`${environment.url_ms_negocio}/displacements/${id}`, theDisplacement);
  }
  delete(id:number){
    return this.http.delete<Displacement>(`${environment.url_ms_negocio}/displacements/${id}`);
  }

}
