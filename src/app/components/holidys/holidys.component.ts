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
  holidayDateWithTheSameDate: any;
  ununiqHolidayDate: boolean = false;
  update: boolean = false;
  holidays: any;
  tempholiday: any;
  tempForDelete: any;
  constructor(public holidayServices: HolidaysService) { }
  holidaysSort(holidaysList: any) {
    for (let i = 0; i < holidaysList.length - 1; i++) {
      for (let j = i + 1; j < holidaysList.length; j++) {
        if (holidaysList[j].holidayDate < holidaysList[i].holidayDate) {
          // Swap elements
          let temp = holidaysList[j];
          holidaysList[j] = holidaysList[i];
          holidaysList[i] = temp;
        }
      }
    }
    return holidaysList;
  }
  ngOnInit(): void {
    this.holidayServices.getHolidays().subscribe({
      next: data => {
        this.holidays = data;
        if (this.holidays.length > 0)
          this.holidays = this.holidaysSort(this.holidays)
      }
    })
  }
  addHoliday() {
    if (this.holidayName == undefined || this.holidayName == "") this.holidayNameField = true;
    else this.holidayNameField = false;
    if (this.holidayDate == undefined || this.holidayDate == "") this.holidayDateField = true;
    else this.holidayDateField = false;
    if (!this.holidayDateField && !this.holidayNameField) {
      this.holidayDateWithTheSameDate = this.holidays.find((h: any) => h.holidayDate == this.holidayDate);
      if (this.holidayDateWithTheSameDate == undefined || (this.update && this.holidayDate == this.tempholiday.holidayDate)) {
        this.ununiqHolidayDate = false;
        if (this.update) {
          this.tempholiday.name = this.holidayName;
          this.tempholiday.holidayDate = this.holidayDate;
          this.holidayServices.editHoliday({
            "id": this.tempholiday.id,
            "name": this.tempholiday.name,
            "holidayDate": this.tempholiday.holidayDate
          }).subscribe({
            next: data => {

              this.update = false
              this.holidayServices.getHolidays().subscribe({
                next: data => {
                  this.holidays = data;
                  this.holidays = this.holidaysSort(this.holidays)
                }
              })
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
              this.holidays = this.holidaysSort(this.holidays)
              // Reset input fields
              this.holidayName = '';
              this.holidayDate = '';
            }

          })
      }
      else {
        this.ununiqHolidayDate = true;
      }

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
