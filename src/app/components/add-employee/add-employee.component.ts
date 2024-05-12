import { EmployeesService } from './../../services/employees.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  invalidId: boolean = false;
  dublicateEmpName: boolean = false;
  iseditMode: boolean = false;


  constructor(
    public formBuilder: FormBuilder,
    public x: DepartmentService,
    public activatedRoute: ActivatedRoute,
    public employeesService: EmployeesService,
    public router: Router
  ) {
    function ageValidator(minAge: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const birthDate = new Date(control.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < minAge) {
          return { 'minAge': { value: control.value } };
        }
        return null;
      };
    }
    function contractDateValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const contractDate = new Date(control.value);
        const minContractDate = new Date('2007-12-31'); // Minimum contract date: January 1, 2007
        if (contractDate <= minContractDate) {
          return { 'minContractDate': { value: control.value } };
        }
        return null;
      };
    }
    this.addempform = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0|1|2|5]{1}[0-9]{8}$/)
      ]),
      gender: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [
        Validators.required,
        ageValidator(20)
      ]),
      id: new FormControl('', [Validators.required,
      Validators.pattern(/^[2|3]\d{13}$/)]),
      contractDate: new FormControl('', [
        Validators.required,
        contractDateValidator() // Using the custom contract date validator
      ]),
      salary: new FormControl('', [Validators.required]),
      arrivingTime: new FormControl('', [Validators.required]),
      leavingTime: new FormControl('', [Validators.required]),
      idDept: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.loadDepartments();
    this.activatedRoute.params.subscribe({
      next: data => {
        this.employeeId = data['id'];
        this.empId = this.employeeId.toString();
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
      this.addempform.get('id')?.disable();
      this.iseditMode = true;
      this.employeesService.getEmployee(this.empId).subscribe({
        next: data => {
          this.tempData = data;
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
    else {
      this.iseditMode = false;
      this.addempform.get('id')?.enable();
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
          if (error.error == "Employee already exist") {
            this.invalidId = true;
          }
          if (error.error == "There is another employee with the same name") this.dublicateEmpName = true;


        }
      });
    } else {
      // Edit existing employee 
      formData.id = this.employeeId;
      formData.arrivingTime = this.convertToTimeSpan(formData.arrivingTime);
      formData.leavingTime = this.convertToTimeSpan(formData.leavingTime);
      this.employeesService.editEmployee(formData).subscribe({
        next: data => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          if (error.error == "There is another employee with the same name") this.dublicateEmpName = true;
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
  removeInvalidId() {
    this.invalidId = false;
  }
  removedublicateEmpNameError() {
    this.dublicateEmpName = false;
  }
}
