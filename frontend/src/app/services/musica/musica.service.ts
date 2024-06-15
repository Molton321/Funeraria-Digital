import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musica } from 'src/app/models/musica/musica.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Musica[]> {
    return this.http.get<Musica[]>(`${environment.url_ms_sustentacion}/servicios-muisicales`);
  }
  create(newMusica: Musica): Observable<Musica> {
    console.log(newMusica)
    return this.http.post<Musica>(`${environment.url_ms_sustentacion}/servicios-muisicales`, newMusica);
  }

}
