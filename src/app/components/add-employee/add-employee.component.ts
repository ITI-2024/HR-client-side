import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  addempform: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  resetForm() {
    this.addempform.reset();
  }
}
