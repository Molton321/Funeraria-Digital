import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/room/room.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomRoom {

  constructor(private http: HttpClient) { }

  list(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.url_ms_negocio}/rooms`);
  }
  listByFuneralHome(id:number): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.url_ms_negocio}/rooms/funeralHome/${id}`);
  }
  view(id:number): Observable<Room>{
    return this.http.get<Room>(`${environment.url_ms_negocio}/rooms/${id}`);
  }
  create(newRoom: Room): Observable<Room>{
    return this.http.post<Room>(`${environment.url_ms_negocio}/rooms`, newRoom);
  }
  update(theRoom: Room): Observable<Room>{    
    const id = theRoom.id;
    theRoom.id = undefined;
    return this.http.put<Room>(`${environment.url_ms_negocio}/rooms/${id}`, theRoom);
  }
  delete(id:number){
    return this.http.delete<Room>(`${environment.url_ms_negocio}/rooms/${id}`);
  }
  
}
