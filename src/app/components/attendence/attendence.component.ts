import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit {
  attendences: any;
  tableLoading: boolean = false;
  disablesSearch: boolean = true;
  Search: any;
  name: any;
  fromDate: any;
  toDate: any;

  constructor(public x: AttendanceService) { }
  ngOnInit(): void {
    console.log(this.fromDate)
    this.tableLoading = true;
    this.attendences = this.x.getAttendance().subscribe({
      next: (data) => {
        this.attendences = data;
        this.tableLoading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  enabledSearch() {
    console.log(this.fromDate)
    console.log(this.toDate)
    if ((this.Search && this.Search != '') || (this.fromDate != undefined && this.toDate != undefined)) {
      this.disablesSearch = false;
    } else {
      this.disablesSearch = true;
    }
  }

  search() {
    this.tableLoading = true;
    if (this.Search == '') {
      this.Search = null;
    }
    if (this.fromDate == undefined || this.toDate == undefined) {
      this.fromDate = null;
      this.toDate = null;
    }
    this.x.getAttendanceBySearch(this.Search, this.fromDate, this.toDate).subscribe({
      next: data => {
        this.attendences = data;
        this.tableLoading = false;
        console.log(data)
      },
      error: e => {
        this.tableLoading = false;
        this.attendences = [];
        alert(e.error);
      }
    });


  }


  deleteAttendanceHandler(id: any) {
    // Display SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'Once deleted, you will not be able to recover data',
      iconHtml: '<i class="bi bi-trash text-danger"></i>', // Custom icon HTML
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#036088',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with deletion
        this.x.deleteAttendance(id).subscribe({
          next: () => {
            // Remove the deleted attendence from the attendence array
            this.attendences = this.attendences.filter(
              (attendence: any) => attendence.id != id
            );
            // Show success message using SweetAlert
            Swal.fire('Attendance Record deleted Successfully', '', 'success');
          },
          error: (error) => {
            console.log(error);
            // Show error message using SweetAlert
            Swal.fire('Error!', 'An error occurred while deleting the attendance', 'error');
          },
        });
      }
    });
  }
  downloadTable() {
    let data = document.getElementById("attendneceTable");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Attendence Report.xlsx');
  }
}