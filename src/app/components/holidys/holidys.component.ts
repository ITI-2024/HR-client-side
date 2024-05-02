import { Component, OnInit } from '@angular/core';
import { HolidaysService } from 'src/app/services/holidays.service';

@Component({
  selector: 'app-holidys',
  templateUrl: './holidys.component.html',
  styleUrls: ['./holidys.component.css']
})
export class HolidysComponent implements OnInit {
  holidayName: any;
  holidayDate: any;
  holidayNameField: boolean = false;
  holidayDateField: boolean = false;
  update: boolean = false;
  holidays: any;
  tempholiday: any;
  tempForDelete: any;
  constructor(public holidayServices: HolidaysService) { }

  ngOnInit(): void {
    this.holidayServices.getHolidays().subscribe({
      next: data => this.holidays = data
    })
  }
  addHoliday() {
    if (this.holidayName == undefined || this.holidayName == "") this.holidayNameField = true;
    else this.holidayNameField = false;
    if (this.holidayDate == undefined || this.holidayDate == "") this.holidayDateField = true;
    else this.holidayDateField = false;
    if (!this.holidayDateField && !this.holidayNameField) {
      if (this.update) {
        this.tempholiday.name = this.holidayName;
        this.tempholiday.holidayDate = this.holidayDate;

        this.holidayServices.editHoliday(this.tempholiday).subscribe({
          next: data => {
            this.update = false
            this.holidays.push(data);
            // Reset input fields
            this.holidayName = '';
            this.holidayDate = '';
          }
        })
      }
      else
        this.holidayServices.addHoliday({
          "name": this.holidayName,
          "holidayDate": this.holidayDate
        }).subscribe({
          next: data => {
            this.holidays.push(data);
            // Reset input fields
            this.holidayName = '';
            this.holidayDate = '';
          }

        })
    }

  }
  editHoliday(id: any) {
    this.holidayServices.getHolidayById(id).subscribe({
      next: data => {
        this.tempholiday = data;
        this.holidayName = this.tempholiday.name;
        this.holidayDate = this.tempholiday.holidayDate;
        this.update = true;
      }
    })
  }
  deleteHoliday(id: any) {
    this.holidayServices.deleteHoliday(id).subscribe({
      next: data => {
        this.tempForDelete = data;
        this.holidays = this.holidays.filter((h: any) => h.id != this.tempForDelete.id)
      }

    })
  }
}
