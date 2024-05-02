import { Component } from '@angular/core';
import { PublicSettingService } from 'src/app/services/public-setting.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  publicSetting: any;
  constructor(public publicSettingsSerivices: PublicSettingService) { }
  addpublicSetting(p: any) {
    this.publicSettingsSerivices.addPublicSetting(p).subscribe({
      next: data => console.log(data)

    })
  }
}
