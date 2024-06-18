import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment/payment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  list(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.url_ms_negocio}/payments`);
  }
  listBySubscription(id:number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.url_ms_negocio}/payments/subscription/${id}`);
  }
  view(id:number): Observable<Payment>{
    return this.http.get<Payment>(`${environment.url_ms_negocio}/payments/${id}`);
  }
  create(newPayment: Payment): Observable<Payment>{
    return this.http.post<Payment>(`${environment.url_ms_negocio}/payments`, newPayment);
  }
  uptate(thePayment: Payment): Observable<Payment>{    
    const id = thePayment.id;
    thePayment.id = undefined;
    return this.http.put<Payment>(`${environment.url_ms_negocio}/payments/${id}`, thePayment);
  }
  delete(id:number){
    return this.http.delete<Payment>(`${environment.url_ms_negocio}/payments/${id}`);
  }

}
