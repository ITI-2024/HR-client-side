import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(public http: HttpClient) { }
  baseUrl = "http://localhost:5258/api/Employee";
  getAllEmployees() {
    return this.http.get(this.baseUrl);
  }
  getEmployee(id: any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  deleteEmployee(id: any) {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }
  AddEmployee(employee:any)
  {
    return this.http.post(this.baseUrl,employee);
  }
 
}

