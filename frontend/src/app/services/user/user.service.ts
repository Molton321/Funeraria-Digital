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
  
  view(id: number): Observable<User> {
    return this.http.get<User>(`${environment.url_ms_security}/api/users/${id}`);
  }

  create(newUser: User): Observable<User> {
    return this.http.post<User>(`${environment.url_ms_security}/api/users`, newUser);
  }

  update(theUser: User): Observable<User> {
    const id = theUser.id;
    theUser.id = undefined;
    return this.http.put<User>(`${environment.url_ms_security}/api/users/${id}`, theUser);
  }

  delete(id: number) {
    return this.http.delete<User>(`${environment.url_ms_security}/api/users/${id}`);
  }

}
