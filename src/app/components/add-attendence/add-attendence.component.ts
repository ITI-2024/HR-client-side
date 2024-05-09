import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-attendence',
  templateUrl: './add-attendence.component.html',
  styleUrls: ['./add-attendence.component.css']
})
export class AddAttendenceComponent implements OnInit {
  addAttendanceForm: FormGroup;
  departments: any;
  attendanceId: any;
  attendId:any;
  tempData: any;
  employees:any;

  constructor(
    public formBuilder: FormBuilder,
    public x: DepartmentService,
    public activatedRoute: ActivatedRoute,
    public attendanceService: AttendanceService,
    public router: Router,
    public employeesService:EmployeesService
  ) {
    this.addAttendanceForm= this.formBuilder.group({
      employeeName: [''],
      arrivingTime: [''],
      dayDate: [''],
      leavingTime: [''],
    });
  }
  ngOnInit(): void {
    this.attendanceId = this.activatedRoute.snapshot.params['id'];
    this.loadDepartments();
    this.loadEmployees(); // Load the list of employees
    this.activatedRoute.params.subscribe({
      next:data=>{
        this.attendanceId = parseInt(data['id']);
        this.getName.setValue('');
        this.getDate.setValue('');
        this.getArrivingTime.setValue('');
        this.getLeavingTime.setValue('');
      }
    });
    if (this.attendanceId != 0) {
      this.attendanceService.getAttendanceById(this.attendanceId).subscribe({
        next:data=>{
          this.tempData=data;
          this.getName.setValue(this.tempData.employeeName);
          this.getDate.setValue(this.tempData.dayDate);
          this.getArrivingTime.setValue(this.tempData.arrivingTime);
          this.getLeavingTime.setValue(this.tempData.leavingTime);
          console.log(this.tempData)
        }
      }

      )
    }
  }
  get getName() {
    return this.addAttendanceForm.controls['employeeName'];
  }
  get getDate() {
    return this.addAttendanceForm.controls['dayDate'];
  }
  get getArrivingTime() {
    return this.addAttendanceForm.controls['arrivingTime'];
  }
  get getLeavingTime() {
    return this.addAttendanceForm.controls['leavingTime'];
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

  loadEmployees() {
    this.employeesService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  attendanceHandler(e: any) {
    e.preventDefault();
    var formData = this.addAttendanceForm.value;
    formData.arrivingTime = this.convertToTimeOnly(formData.arrivingTime);
    formData.leavingTime = this.convertToTimeOnly(formData.leavingTime);

    if (this.attendanceId == '0') {
      // Add new employee
      this.attendanceService.addAttendance(formData).subscribe({
        next: (data) => {
          this.router.navigate(['/attendenceReport']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    } 
    else {
      // Edit existing employee 
      formData.id = this.attendanceId;
      formData.arrivingTime = this.convertToTimeOnly(formData.arrivingTime);
      formData.leavingTime = this.convertToTimeOnly(formData.leavingTime);
      this.attendanceService.editAttendance(formData.id,formData).subscribe({
        next:data=>{
          this.router.navigate(['/attendenceReport']);
        }
      }  
      );
    }
  }
  convertToTimeOnly(inputValue: string): string {
    const parts = inputValue.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const timeOnly = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    return timeOnly;
  }
}

