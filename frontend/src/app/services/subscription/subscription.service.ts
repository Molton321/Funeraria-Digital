import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'src/app/models/subscription/subscription.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }
  list(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${environment.url_ms_negocio}/subscriptions`);
  }
  view(id:number): Observable<Subscription>{
    return this.http.get<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`);
  }
  create(newSubscription: Subscription): Observable<Subscription>{
    return this.http.post<Subscription>(`${environment.url_ms_negocio}/subscriptions`, newSubscription);
  }
  uptate(theSubscription: Subscription): Observable<Subscription>{    
    const id = theSubscription.id;
    theSubscription.id = undefined;
    return this.http.put<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`, theSubscription);
  }
  delete(id:number){
    return this.http.delete<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`);
  }
  
}
