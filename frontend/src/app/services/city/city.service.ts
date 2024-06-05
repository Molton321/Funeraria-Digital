import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city/city.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  
  constructor(private http: HttpClient) { }

  list(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.url_ms_negocio}/cities`);
  }
  view(id: number): Observable<City> {
    return this.http.get<City>(`${environment.url_ms_negocio}/cities/${id}`);
  }
  create(newCity: City): Observable<City> {
    return this.http.post<City>(`${environment.url_ms_negocio}/cities`, newCity);
  }
  update(theCity: City): Observable<City> {
    const id = theCity.id;
    theCity.id = undefined;
    return this.http.put<City>(`${environment.url_ms_negocio}/cities/${id}`, theCity);
  }
  delete(id: number) {
    return this.http.delete<City>(`${environment.url_ms_negocio}/cities/${id}`);
  }

}
