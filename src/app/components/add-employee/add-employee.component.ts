import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addempform: FormGroup;
  departments: any;
  
  constructor(private formBuilder: FormBuilder , public x:DepartmentService) {
    this.addempform = this.formBuilder.group({
      Name: [''],
      Address: [''],
      Phone: [''],
      Gender: [''],
      Nationality: [''],
      Birthdate: [''],
      Id: [''],
      Contract: [''],
      Salary: [''],
      Arrive: [''],
      Leave: ['']
    });
  }
  ngOnInit(): void {
    this.departments = this.x.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  resetForm() {
    this.addempform.reset();
  }
}
