import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceExecution } from 'src/app/models/service-execution/service-execution.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceExecutionService {

  constructor(private http: HttpClient) { }

  list(): Observable<ServiceExecution[]> {
    return this.http.get<ServiceExecution[]>(`${environment.url_ms_negocio}/serviceExecutions`);
  }

  view(id: number): Observable<ServiceExecution> {
    return this.http.get<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecutions/${id}`);
  }

  create(newServiceExecution: ServiceExecution): Observable<ServiceExecution> {
    return this.http.post<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecutions`, newServiceExecution);
  }

  update(theServiceExecution: ServiceExecution): Observable<ServiceExecution> {
    const id = theServiceExecution.id;
    theServiceExecution.id = undefined;
    return this.http.put<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecutions/${id}`, theServiceExecution);
  }

  delete(id: number) {
    return this.http.delete<ServiceExecution>(`${environment.url_ms_negocio}/serviceExecutions/${id}`);
  }

}
