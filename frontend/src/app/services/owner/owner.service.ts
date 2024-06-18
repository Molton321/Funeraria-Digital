import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from 'src/app/models/owner/owner.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  list(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.url_ms_negocio}/owners`);
  }
  listByClient(id:number): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.url_ms_negocio}/owners/client/${id}`);
  }
  view(id:number): Observable<Owner>{
    return this.http.get<Owner>(`${environment.url_ms_negocio}/owners/${id}`);
  }
  create(newOwner: Owner): Observable<Owner>{
    return this.http.post<Owner>(`${environment.url_ms_negocio}/owners`, newOwner);
  }
  update(theOwner: Owner): Observable<Owner>{    
    const id = theOwner.id;
    theOwner.id = undefined;
    return this.http.put<Owner>(`${environment.url_ms_negocio}/owners/${id}`, theOwner);
  }
  delete(id:number){
    return this.http.delete<Owner>(`${environment.url_ms_negocio}/owners/${id}`);
  }

}
