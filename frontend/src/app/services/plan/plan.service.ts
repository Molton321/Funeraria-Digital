import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/plan/plan.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  list(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans`);
  }
  listByService(id:number): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans/service/${id}`);
  }
  listByClient(id:number): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans/client/${id}`);
  }
  view(id:number): Observable<Plan>{
    return this.http.get<Plan>(`${environment.url_ms_negocio}/plans/${id}`);
  }
  create(newPlan: Plan): Observable<Plan>{
    return this.http.post<Plan>(`${environment.url_ms_negocio}/plans`, newPlan);
  }
  update(thePlan: Plan): Observable<Plan>{    
    const id = thePlan.id;
    thePlan.id = undefined;
    return this.http.put<Plan>(`${environment.url_ms_negocio}/plans/${id}`, thePlan);
  }
  delete(id: number){
    return this.http.delete<Plan>(`${environment.url_ms_negocio}/plans/${id}`);
  }
  
}
