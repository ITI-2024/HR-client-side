import { Component, OnInit } from '@angular/core';
import { PublicSettingService } from 'src/app/services/public-setting.service';

@Component({
  selector: 'app-public-setting',
  templateUrl: './public-setting.component.html',
  styleUrls: ['./public-setting.component.css']
})
export class PublicSettingComponent implements OnInit {
  disabled: boolean = true;
  extraHours: any;
  deductionHours: any;
  weekendDay1: any;
  weekendDay2: any;
  extraHoursField: boolean = false;
  deductionHoursField: boolean = false;
  weekendDay1Field: boolean = false;
  weekendDay2Field: boolean = false;
  extraHoursInValid: boolean = false;
  deductionHoursInValid: boolean = false;
  setting: any;
  constructor(public publicSettingsSerivices: PublicSettingService) { }
  ngOnInit(): void {
    this.publicSettingsSerivices.getPuplicSetting().subscribe({
      next: data => {
        this.setting = data;
        this.setting = this.setting[0];
        this.extraHours = this.setting.extraHours;
        this.deductionHours = this.setting.deductionHours;
        this.weekendDay1 = this.setting.firstWeekend;
        this.weekendDay2 = (this.setting.secondWeekend == null) ? null : this.setting.secondWeekend

      }
    })
  }
  save(e: any) {
    if (this.extraHours == undefined) this.extraHoursField = true;
    else this.extraHoursField = false;

    if (this.deductionHours == undefined) this.deductionHoursField = true;
    else this.deductionHoursField = false;

    if (this.extraHours < 1 || this.extraHours > 4) this.extraHoursInValid = true;
    else this.extraHoursInValid = false;
    if (this.deductionHours < 1 || this.deductionHours > 4) this.deductionHoursInValid = true;
    else this.deductionHoursInValid = false;

    if (!this.extraHoursField && !this.deductionHoursField && !this.weekendDay1Field && !this.extraHoursInValid && !this.deductionHoursInValid) {
      this.publicSettingsSerivices.editPublicSetting(this.setting.id, {
        "extraHours": this.extraHours,
        "deductionHours": this.deductionHours,
        "firstWeekend": this.weekendDay1,
        "secondWeekend": this.weekendDay2 == 'none' ? null : this.weekendDay2
      }).subscribe({
        next: data => this.toggleDisabled()

      })
    }
  }
  toggleDisabled() {
    this.disabled = !this.disabled
  }
}
