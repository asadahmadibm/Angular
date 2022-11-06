import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { industryModel } from '../models/industry.model';
import { resultMessage } from '../models/resultMessage.model';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
   reqHeader = {headers:new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
 })};
  constructor(private http:HttpClient) { }

  getindustry(): Observable<industryModel[]> {

    return this.http.get<industryModel[]>("http://46.100.47.160:8013/api/Industry/GetAll",this.reqHeader)
}

insert(question: industryModel): Observable<resultMessage>{
  return this.http.post<resultMessage>('http://46.100.47.160:8013/api/Industry/Insert',question,this.reqHeader)
}

}
