import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl:string='https://localhost:7291/api/Auth';

  constructor(public http: HttpClient) { 
    
  }
  getlogin(User: any){
    return this.http.post(`${this.baseUrl}/login`,User)
 }
 AddUser(User: any) {
  console.log(User);
  return this.http.post(`${this.baseUrl}`, User)
}
}
