import { EmployeesService } from './../../services/employees.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addempform: FormGroup;
  departments: any;
  employeeId: any;

  constructor(
    private formBuilder: FormBuilder,
    public x: DepartmentService,
    public activatedRoute: ActivatedRoute,
    public employeesService: EmployeesService,
    public router: Router
  ) {
    this.addempform = this.formBuilder.group({
      name: [''],
      address: [''],
      phoneNumber: [''],
      gender: [''],
      nationality: [''],
      birthDate: [''],
      id: [''],
      contractDate: [''],
      salary: [''],
      arrivingTime: [''],
      leavingTime: [''],
      idDept: ['']
    });
  }

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.loadDepartments();
  }

   loadDepartments() {
    this.departments = this.x.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  employeeHandler(e: any) {
    e.preventDefault();
    if (this.employeeId == 0) {
      const formData = this.addempform.value;
      formData.arrivingTime = this.convertToTimeSpan(formData.arrivingTime);
      formData.leavingTime =this.convertToTimeSpan(formData.leavingTime);
      // Parse idDept to a number
      formData.idDept = parseInt(formData.idDept, 10);
      // Add new employee
      console.log(formData)
      this.employeesService.AddEmployee(formData).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      console.log(this.addempform.value);
      // Edit existing employee 
      this.employeesService.getEmployee(this.employeeId, this.addempform.value).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  convertToTimeSpan(inputValue: string): string {
    const parts = inputValue.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    const timeSpan = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    return timeSpan;
  }
  resetForm() {
    this.addempform.reset();
  }
}

