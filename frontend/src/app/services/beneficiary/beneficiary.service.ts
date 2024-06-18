import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from 'src/app/models/beneficiary/beneficiary.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }

  list(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries`);
  }
  listByClient(id:number): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries/client/${id}`);
  }
  listByOwner(id:number): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries/owner/${id}`);
  }
  listByClientAndOwner(idClient:number, idOwner:number): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries/client/${idClient}/owner/${idOwner}`);
  }
  view(id: number): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`);
  }
  create(newBeneficiary: Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries`, newBeneficiary);
  }
  update(theBeneficiary: Beneficiary): Observable<Beneficiary> {
    const id = theBeneficiary.id;
    theBeneficiary.id = undefined;
    return this.http.put<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`, theBeneficiary);
  }
  delete(id: number) {
    return this.http.delete<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`);
  }

}
