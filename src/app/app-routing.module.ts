import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { HolidysComponent } from './components/holidys/holidys.component';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';
import { LoginComponent } from './components/login/login.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';


const routes: Routes = [

  { path: '', component: EmployeesComponent },
  { path: '', component: AttendanceComponent },
  { path: 'salaryReport', component: SalaryReportComponent },
  { path: 'attendenceReport', component: AttendanceComponent },
  { path: 'holidays', component: HolidysComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  { path: 'employees', component:  EmployeesComponent },
  /*{ path: '**', component: NotFoundComponent },*/
  { path: 'login', component: LoginComponent },
  { path: 'permissions', component: AddPermissionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
