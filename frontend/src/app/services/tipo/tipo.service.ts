import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from 'src/app/models/tipo/tipo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${environment.url_ms_sustentacion}/tipos-musica`);
  }
  
}
