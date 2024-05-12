import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any;

  constructor(public x: EmployeesService) {}

  ngOnInit(): void {
    this.employees = this.x.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(this.employees);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteEmployeeHandler(id: any) {
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
        this.x.deleteEmployee(id).subscribe({
          next: () => {
            // Remove the deleted employee from the employees array
            this.employees = this.employees.filter(
              (employee: any) => employee.nationalID != id
            );
            // Show success message using SweetAlert
            Swal.fire('Employee Record deleted Successfully', '', 'success');
          },
          error: (error) => {
            console.log(error);
            // Show error message using SweetAlert
            Swal.fire('Error!', 'An error occurred while deleting the employee', 'error');
          },
        });
      }
    });
  }
 
}
