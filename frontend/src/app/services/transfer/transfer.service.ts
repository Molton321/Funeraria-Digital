import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from 'src/app/models/transfer/transfer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  list(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${environment.url_ms_negocio}/transfers`);
  }
  listByService(id:number): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${environment.url_ms_negocio}/transfers/service/${id}`);
  }
  view(id:number): Observable<Transfer>{
    return this.http.get<Transfer>(`${environment.url_ms_negocio}/transfers/${id}`);
  }
  create(newTransfer: Transfer): Observable<Transfer>{
    return this.http.post<Transfer>(`${environment.url_ms_negocio}/transfers`, newTransfer);
  }
  update(theTransfer: Transfer): Observable<Transfer>{    
    const id = theTransfer.id;
    theTransfer.id = undefined;
    return this.http.put<Transfer>(`${environment.url_ms_negocio}/transfers/${id}`, theTransfer);
  }
  delete(id:number){
    return this.http.delete<Transfer>(`${environment.url_ms_negocio}/transfers/${id}`);
  }

}
