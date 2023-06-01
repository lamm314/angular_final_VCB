import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { companymodel } from '../Model/companymodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/company';
  Getallcompany():Observable<companymodel[]>{
    return this.http.get<companymodel[]>(this.apiurl);
  }
  CreateCompany(companydata:any){
    return this.http.post(this.apiurl,companydata);

  }
  GetCompanybycode(id: any): Observable<companymodel> {
    return this.http.get<companymodel>(this.apiurl + '/' + id);
  }

  RemoveCompanybycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateComapny(companydata: any) {
    return this.http.post(this.apiurl, companydata);
  }

  UpdateComapny(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }
}
