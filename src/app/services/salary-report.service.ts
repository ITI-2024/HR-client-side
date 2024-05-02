import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryReportService {
  baseUrl: string = 'https://localhost:7291/api/SalaryReport';
  constructor(public http: HttpClient) { }
  getSalaryReports() {
    return this.http.get(this.baseUrl);
  }
  /*  getHolidayById(id: any) {
     return this.http.get(`${this.baseUrl}/id?id=${id}`);
   }
   addHoliday(holiday: any) {
     return this.http.post(this.baseUrl, holiday);
   }
   editHoliday(holiday: any) {
 
     return this.http.put(`${this.baseUrl}/Edit`, holiday);
   }
   deleteHoliday(id: any) {
     return this.http.delete(`${this.baseUrl}/Delete?id=${id}`);
   } */
}
