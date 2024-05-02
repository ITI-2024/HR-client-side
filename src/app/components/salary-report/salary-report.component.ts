import { Component, OnInit } from '@angular/core';
import { SalaryReportService } from 'src/app/services/salary-report.service';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css']
})
export class SalaryReportComponent implements OnInit {
  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  years: number[] = [];
  Month: any;
  Year: any;
  salaryReports: any;
  constructor(public salaryReportsServices: SalaryReportService) {
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  ngOnInit(): void {
    this.salaryReportsServices.getSalaryReports().subscribe({
      next: data => this.salaryReports = data
    })
  }
  search() {

  }
}
