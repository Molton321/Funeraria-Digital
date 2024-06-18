import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url_ms_security}/api/users`);
  }
  view(id: string): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/api/users/${id}`);
  }
  create(newUser: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/api/users`, newUser);
  }
  update(theUser: User): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/api/users/${theUser.id}`, theUser);
  }
  matchRole(idUser: string, idRole: number): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/api/users/${idUser}/match-role/${idRole}`, null);
  }
  unMatchRole(idUser: string, idRole: number): Observable<User> {
    return this.http.put<User>(`${environment.url_ms_security}/api/users/${idUser}/unmatch-role/${idRole}`, null);
  }
  delete(id: string) {
    return this.http.delete<User>(`${environment.url_ms_security}/api/users/${id}`);
  }

}
