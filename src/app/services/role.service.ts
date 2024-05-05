import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http: HttpClient) { }
  baseUrl: string = 'https://localhost:7291/api/RoleName';
  getRole(){
    return this.http.get(this.baseUrl);
  }
  getById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  addRole(role: any){
    return this.http.post(this.baseUrl,role);
  }
  deleteRole(id:any){
    return this.http.delete(this.baseUrl+"/"+id);
  }
}
