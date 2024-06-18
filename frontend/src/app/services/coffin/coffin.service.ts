import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coffin } from 'src/app/models/coffin/coffin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffinService {

  constructor(private http: HttpClient) { }

  list(): Observable<Coffin[]> {
    return this.http.get<Coffin[]>(`${environment.url_ms_negocio}/coffins`);
  }
  view(id:number): Observable<Coffin>{
    return this.http.get<Coffin>(`${environment.url_ms_negocio}/coffins/${id}`);
  }
  create(newCoffin: Coffin): Observable<Coffin>{
    return this.http.post<Coffin>(`${environment.url_ms_negocio}/coffins`, newCoffin);
  }

}
