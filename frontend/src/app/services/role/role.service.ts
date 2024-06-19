import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role/role.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_ms_security}/roles`);
  }
  view(id: string): Observable<Role> {
    return this.http.get<Role>(`${environment.url_ms_security}/roles/${id}`);
  }
  create(newRole: Role): Observable<Role> {
    return this.http.post<Role>(`${environment.url_ms_security}/roles`, newRole);
  }
  update(theRole: Role): Observable<Role> {
    const id = theRole.id;
    theRole.id = undefined;
    return this.http.put<Role>(`${environment.url_ms_security}/roles/${id}`, theRole);
  }
  delete(id: string) {
    return this.http.delete<Role>(`${environment.url_ms_security}/roles/${id}`);
  }

}
