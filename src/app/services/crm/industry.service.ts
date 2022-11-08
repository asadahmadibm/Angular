import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { industryModel } from "../../models/industry.model";
import { resultMessage } from "../../models/resultMessage.model";
import { ApiServices } from "../api.services";

@Injectable({
  providedIn: "root",
})
export class IndustryService {
  constructor(private http: HttpClient ,private api:ApiServices ) {}

  getindustry(): Observable<industryModel[]> {
    return this.http.get<industryModel[]>(
      "http://46.100.47.160:8013/api/Industry/GetAll"
    );
  }

getindustry2() :Observable<any[]>
{
  return this.api.get("Industry/GetAll").pipe(
    map((res)=>{
      return res.data})
  );
}


  insert(question: industryModel): Observable<resultMessage> {
    return this.http.post<resultMessage>(
      "http://46.100.47.160:8013/api/Industry/Insert",
      question
    );
  }
}
