import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from 'src/app/models/administrator/administrator.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  
  constructor(private http: HttpClient) { }

  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${environment.url_ms_negocio}/administrators`);
  }
  
  view(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`${environment.url_ms_negocio}/administrators/${id}`);
  }

  create(newAdministrator: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(`${environment.url_ms_negocio}/administrators`, newAdministrator);
  }

  update(theAdministrator: Administrator): Observable<Administrator> {
    const id = theAdministrator.id;
    theAdministrator.id = undefined;
    return this.http.put<Administrator>(`${environment.url_ms_negocio}/administrators/${id}`, theAdministrator);
  }

  delete(id: number) {
    return this.http.delete<Administrator>(`${environment.url_ms_negocio}/administrators/${id}`);
  }

}
