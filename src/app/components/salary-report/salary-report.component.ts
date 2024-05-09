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
  Search: any;
  Month: any;
  Year: any;
  salaryReports: any;
  disablesSearch: boolean = true;
  tableLoading: boolean = false;
  constructor(public salaryReportsServices: SalaryReportService) {
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  ngOnInit(): void {
    this.tableLoading = true;
    this.salaryReportsServices.getSalaryReports().subscribe({
      next: data => {
        this.salaryReports = data;
        this.tableLoading = false;
      }
    })
  }
  enabledSearch() {
    if ((this.Search && this.Search != '') || (this.Month && this.Year)) this.disablesSearch = false;
    else this.disablesSearch = true;
  }

  search() {
    this.tableLoading = true;
    if (this.Search && this.Search != '') {
      if ((this.Month && this.Year)) this.salaryReportsServices.getSalaryReportByBoth(this.Year, this.Month, this.Search).subscribe({
        next: data => {
          this.salaryReports = data;
          this.tableLoading = false;

        }, error: e => {
          this.tableLoading = false;
          this.salaryReports = [];
          alert(e.error);

        }
      })
      else this.salaryReportsServices.getSalaryReportByName(this.Search).subscribe({
        next: data => {
          this.salaryReports = data;
          this.tableLoading = false;

        }, error: e => {
          this.tableLoading = false;
          this.salaryReports = [];
          alert(e.error);

        }

      })
    }
    else this.salaryReportsServices.getSalaryReportByDate(this.Year, this.Month).subscribe({
      next: data => {
        this.salaryReports = data;
        this.tableLoading = false;

      }, error: e => {
        this.tableLoading = false;
        this.salaryReports = [];
        alert(e.error);

      }

    })
  }
}
