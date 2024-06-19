import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/models/driver/driver.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  list(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.url_ms_negocio}/drivers`);
  }
  listByUser(id:string): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.url_ms_negocio}/drivers/user/${id}`);
  }
  view(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${environment.url_ms_negocio}/drivers/${id}`);
  }
  create(newDriver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${environment.url_ms_negocio}/drivers`, newDriver);
  }
  update(theDriver: Driver): Observable<Driver> {
    const id = theDriver.id;
    theDriver.id = undefined;
    return this.http.put<Driver>(`${environment.url_ms_negocio}/drivers/${id}`, theDriver);
  }
  delete(id: number) {
    return this.http.delete<Driver>(`${environment.url_ms_negocio}/drivers/${id}`);
  }

}
