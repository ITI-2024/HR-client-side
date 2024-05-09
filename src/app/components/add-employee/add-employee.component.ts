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
  tempData: any;
  empId: any;

  constructor(
    public formBuilder: FormBuilder,
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
    this.activatedRoute.params.subscribe({
      next:data=>{
        this.employeeId= data['id'];
        this.empId=this.employeeId.toString();
        this.getEmployeename.setValue('');
        this.getEmployeeaddress.setValue('');
        this.getEmployeegender.setValue('');
        this.getEmployeenationality.setValue('');
        this.getEmployeeid.setValue('');
        this.getEmployeecontractDate.setValue('');
        this.getEmployeesalary.setValue('');
        this.getEmployeearrivingTime.setValue('');
        this.getEmployeeleavingTime.setValue('');
        this.getEmployeeidDept.setValue('');
        this.getEmployeebirthDate.setValue('');
        this.getEmployeephoneNumber.setValue('');
      }
    });
    if (this.employeeId != 0) {
      this.employeesService.getEmployee(this.empId).subscribe({
        next:data=>{
          this.tempData=data;
          this.getEmployeename.setValue(this.tempData.name);
          this.getEmployeeaddress.setValue(this.tempData.address);
          this.getEmployeegender.setValue(this.tempData.gender);
          this.getEmployeenationality.setValue(this.tempData.nationality);
          this.getEmployeeid.setValue(this.tempData.id);
          this.getEmployeecontractDate.setValue(this.tempData.contractDate);
          this.getEmployeesalary.setValue(this.tempData.salary);
          this.getEmployeearrivingTime.setValue(this.tempData.arrivingTime);
          this.getEmployeeleavingTime.setValue(this.tempData.leavingTime);
          this.getEmployeeidDept.setValue(this.tempData.idDept);
          this.getEmployeebirthDate.setValue(this.tempData.birthDate);
          this.getEmployeephoneNumber.setValue(this.tempData.phoneNumber);

        }
      }

      )
    }

  }
  get getEmployeename() {
    return this.addempform.controls['name'];
  }
  get getEmployeeaddress() {
    return this.addempform.controls['address'];
  }
  get getEmployeegender() {
    return this.addempform.controls['gender'];
  }
  get getEmployeenationality() {
    return this.addempform.controls['nationality'];
  }
  get getEmployeeid() {
    return this.addempform.controls['id'];
  }
  get getEmployeecontractDate() {
    return this.addempform.controls['contractDate'];
  }
  get getEmployeesalary() {
    return this.addempform.controls['salary'];
  }
  get getEmployeearrivingTime() {
    return this.addempform.controls['arrivingTime'];
  }
  get getEmployeeleavingTime() {
    return this.addempform.controls['leavingTime'];
  }
  get getEmployeeidDept() {
    return this.addempform.controls['idDept'];
  }
  get getEmployeebirthDate() {
    return this.addempform.controls['birthDate'];
  }
  get getEmployeephoneNumber() {
    return this.addempform.controls['phoneNumber'];
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
    var formData = this.addempform.value;
    formData.arrivingTime = this.convertToTimeSpan(formData.arrivingTime);
    formData.leavingTime = this.convertToTimeSpan(formData.leavingTime);
    formData.idDept = parseInt(formData.idDept, 10);

    if (this.employeeId == '0') {
      // Add new employee
      this.employeesService.AddEmployee(formData).subscribe({
        next: (data) => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      // Edit existing employee 
      formData.id = this.employeeId;
      formData.arrivingTime = this.convertToTimeSpan(formData.arrivingTime);
      formData.leavingTime = this.convertToTimeSpan(formData.leavingTime);
      this.employeesService.editEmployee(formData).subscribe({
        next:data=>{
          this.router.navigate(['/employees']);
        }
      }  
      );
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
