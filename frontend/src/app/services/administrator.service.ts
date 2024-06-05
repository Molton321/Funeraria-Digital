import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator/administrator.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }

  list():Observable<Administrator[]>{
    return this.http.get<Administrator[]>(`${environment.url_ms_negocio}/administrators`);
  }

  view(id: number):Observable<Administrator>{
    return this.http.get<Administrator>(`${environment.url_ms_negocio}/administrator/view/${id}`);
  }

  create(administrator: Administrator):Observable<Administrator>{
    return this.http.post<Administrator>(`${environment.url_ms_negocio}/administrator/create`, administrator);
  }

  update(administrator: Administrator):Observable<Administrator>{
    return this.http.put<Administrator>(`${environment.url_ms_negocio}/administrator/update`, administrator);
  }

  delete(id: number):Observable<Administrator>{
    return this.http.delete<Administrator>(`${environment.url_ms_negocio}/administrator/delete/${id}`);
  }
}
