import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
/*import { NotFoundComponent } from './components/not-found/not-found.component';*/
import { EmployeesComponent } from './components/employees/employees.component';
import { HolidysComponent } from './components/holidys/holidys.component';

import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { AddPermissionComponent } from './components/roles/add-permission/add-permission.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RolesComponent } from './components/roles/roles.component';


const routes: Routes = [

  { path: 'employees', component: EmployeesComponent },
  { path: '', component: AttendanceComponent },
  { path: 'salaryReport', component: SalaryReportComponent },
  { path: 'attendenceReport', component: AttendanceComponent },
  { path: 'holidays', component: HolidysComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  //{ path: '**', component: NotFoundComponent },
  {path:'user', component:UserComponent},
  {path:'login', component: LoginComponent},
  { path: 'permissions/:id', component: AddPermissionComponent },
  { path: 'roles', component: RolesComponent },

  {path:'employee/:id/edit', component:AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
