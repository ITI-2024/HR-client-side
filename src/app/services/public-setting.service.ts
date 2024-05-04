import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicSettingService {
  baseUrl: string = 'http://localhost:5258/api/PublicSetting';
  constructor(public http: HttpClient) { }
  getPuplicSetting() {
    return this.http.get(this.baseUrl);
  }
  addPublicSetting(publicSetting: any) {
    return this.http.post(this.baseUrl, publicSetting);
  }
  editPublicSetting(id: any, publicSetting: any) {
    return this.http.put(`${this.baseUrl}/${id}`, publicSetting);
  }
}
