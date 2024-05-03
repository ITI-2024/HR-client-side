import { Component } from '@angular/core';
import { PublicSettingService } from './services/public-setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  publicSetting: any;
  constructor(public publicSettingsSerivices: PublicSettingService) { }
  addpublicSetting(p: any) {
    this.publicSettingsSerivices.addPublicSetting(p).subscribe({
      next: data => console.log(data)

    })
  }
}
