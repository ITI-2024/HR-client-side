import { Component } from '@angular/core';
import { PublicSettingService } from 'src/app/services/public-setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /**
   *
   */
  constructor(public settingServices: PublicSettingService) {
  }
  addPublicSetting(data: any) {
    this.settingServices.addPublicSetting(data).subscribe({
      next: data => console.log(data)
    })
  }

}
