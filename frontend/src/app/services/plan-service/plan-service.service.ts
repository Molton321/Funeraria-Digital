import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanService } from 'src/app/models/plan-service/plan-service.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {

  constructor(private http: HttpClient) { }
  list(): Observable<PlanService[]> {
    return this.http.get<PlanService[]>(`${environment.url_ms_negocio}/planServices`);
  }
  listByService(id:number): Observable<PlanService[]> {
    return this.http.get<PlanService[]>(`${environment.url_ms_negocio}/planServices/service/${id}`);
  }
  listByPlan(id:number): Observable<PlanService[]> {
    return this.http.get<PlanService[]>(`${environment.url_ms_negocio}/planServices/plan/${id}`);
  }
  listByPlanAndService(idPlan:number, idService:number): Observable<PlanService[]> {
    return this.http.get<PlanService[]>(`${environment.url_ms_negocio}/planServices/plan/${idPlan}/service/${idService}`);
  }
  view(id:number): Observable<PlanService>{
    return this.http.get<PlanService>(`${environment.url_ms_negocio}/planServices/${id}`);
  }
  create(newPlanService: PlanService): Observable<PlanService>{
    return this.http.post<PlanService>(`${environment.url_ms_negocio}/planServices`, newPlanService);
  }
  update(thePlanService: PlanService): Observable<PlanService>{    
    const id = thePlanService.id;
    thePlanService.id = undefined;
    return this.http.put<PlanService>(`${environment.url_ms_negocio}/planServices/${id}`, thePlanService);
  }
  delete(id:number){
    return this.http.delete<PlanService>(`${environment.url_ms_negocio}/planServices/${id}`);
  }
  
}
