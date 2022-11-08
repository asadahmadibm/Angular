import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http:HttpClient) { }

  loginTest(){
    return this.http.get('http://46.100.47.160:8013/api/Login/loginTest')
  }
}
