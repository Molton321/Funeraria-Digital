import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service/service.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_negocio}/services`);
  }
  view(id:number): Observable<Service>{
    return this.http.get<Service>(`${environment.url_ms_negocio}/services/${id}`);
  }
  create(newService: Service): Observable<Service>{
    return this.http.post<Service>(`${environment.url_ms_negocio}/services`, newService);
  }
  uptate(theService: Service): Observable<Service>{    
    const id = theService.id;
    theService.id = undefined;
    return this.http.put<Service>(`${environment.url_ms_negocio}/services/${id}`, theService);
  }
  delete(id:number){
    return this.http.delete<Service>(`${environment.url_ms_negocio}/services/${id}`);
  }
  
}
