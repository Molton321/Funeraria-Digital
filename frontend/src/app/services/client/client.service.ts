import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client/client.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  list(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.url_ms_negocio}/clients`);
  }
  view(id:number): Observable<Client>{
    return this.http.get<Client>(`${environment.url_ms_negocio}/clients/${id}`);
  }
  create(newClient: Client): Observable<Client>{
    return this.http.post<Client>(`${environment.url_ms_negocio}/clients`, newClient);
  }
  uptate(theClient: Client): Observable<Client>{    
    const id = theClient.id;
    theClient.id = undefined;
    return this.http.put<Client>(`${environment.url_ms_negocio}/clients/${id}`, theClient);
  }
  delete(id:number){
    return this.http.delete<Client>(`${environment.url_ms_negocio}/clients/${id}`);
  }
  
}
