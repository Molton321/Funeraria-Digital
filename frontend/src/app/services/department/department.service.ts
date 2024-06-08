import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/department/department.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  list(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url_ms_negocio}/departments`);
  }
  view(id: number): Observable<Department> {
    return this.http.get<Department>(`${environment.url_ms_negocio}/departments/${id}`);
  }
  create(newDepartment: Department): Observable<Department> {
    return this.http.post<Department>(`${environment.url_ms_negocio}/departments`, newDepartment);
  }
  update(theDepartment: Department): Observable<Department> {
    const id = theDepartment.id;
    theDepartment.id = undefined;
    return this.http.put<Department>(`${environment.url_ms_negocio}/departments/${id}`, theDepartment);
  }
  delete(id: number) {
    return this.http.delete<Department>(`${environment.url_ms_negocio}/departments/${id}`);
  }
  
}
