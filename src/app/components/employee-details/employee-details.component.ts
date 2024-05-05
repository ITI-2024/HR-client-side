import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: any;
  employee: any;
  department: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public employeeService: EmployeesService,
    public router: Router,
    public departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.employeeService.getEmployee(this.employeeId).subscribe({
      next: (data: any) => {
        this.employee = data;
        this.loadDepartment(data.idDept);
      },
      error: (error: any) => {
        console.error('Error fetching employee data:', error);
      }
    });
  }

  loadDepartment(departmentId: any) {
    this.departmentService.getDepartmentById(departmentId).subscribe({
      next: (data: any) => {
        this.department = data.name; 
      },
      error: (error: any) => {
        console.error('Error fetching department data:', error);
      }
    });
  }
}
