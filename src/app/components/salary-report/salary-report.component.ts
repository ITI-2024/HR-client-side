import { Component, OnInit } from '@angular/core';
import { SalaryReportService } from 'src/app/services/salary-report.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
    for (let year = 2008; year <= currentYear; year++) {
      this.years.push(year);
    }
  }
  ngOnInit(): void {
    this.tableLoading = true;
    this.salaryReportsServices.getSalaryReports().subscribe({
      next: data => {
        this.salaryReports = data;
        this.tableLoading = false;
      }, error: e => {
        this.tableLoading = false;
        alert(e.error);
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
  generatePDF(index: any) {
    console.log(`${this.salaryReports[index].mainSalary} $`);

    const elementToPrint: any = document.getElementById("pdfContent");
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);

      pdf.text("Name:", 10, 10);
      pdf.text(this.salaryReports[index].empName, 30, 10);
      pdf.text("Department:", 10, 20);
      pdf.text(this.salaryReports[index].deptName, 45, 20);
      pdf.text("-----------------------------------------------------------------------------------------------------", 10, 25);
      pdf.text("Main Salary:", 20, 45);
      pdf.text(`${this.salaryReports[index].mainSalary} EG`, 160, 45);
      pdf.text("Attend Days:", 20, 65);
      pdf.text(`${this.salaryReports[index].attendDay}`, 168, 65);
      pdf.text("Absent Days:", 20, 85);
      pdf.text(`${this.salaryReports[index].absentDay}`, 168, 85);
      pdf.text("OverTime Hours:", 20, 105);
      pdf.text(`${this.salaryReports[index].extraHours}`, 168, 105);
      pdf.text("Deductions Hours:", 20, 125);
      pdf.text(`${this.salaryReports[index].dedectionHours}`, 168, 125);
      pdf.text("Total OverTime:", 20, 145);
      pdf.text(`${this.salaryReports[index].totalExtra}`, 168, 145);
      pdf.text("Total Deductions:", 20, 165);
      pdf.text(`${this.salaryReports[index].totalDiscount}`, 168, 165);
      pdf.text("Net Salary:", 20, 185);
      pdf.text(`${this.salaryReports[index].totalNetSalary} EG`, 160, 185);
      pdf.text("-----------------------------------------------------------------------------------------------------", 10, 283);
      pdf.text("sales@pioneers-solutions.com", 123, 290);

      pdf.setFontSize(12);
      pdf.save(`${this.salaryReports[index].empName} Salary Report.pdf`);
    });
  }
}
