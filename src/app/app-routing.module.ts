
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
/*import { NotFoundComponent } from './components/not-found/not-found.component';*/
import { EmployeesComponent } from './components/employees/employees.component';
import { HolidysComponent } from './components/holidys/holidys.component';

import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { AddPermissionComponent } from './components/roles/add-permission/add-permission.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RolesComponent } from './components/roles/roles.component';
import { AttendenceComponent } from './components/attendence/attendence.component';
import { AddAttendenceComponent } from './components/add-attendence/add-attendence.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './components/services/auth.guard';
import { priventLoginGuard } from './components/services/privent-login.guard';
import { roleAuthGuard } from './components/services/role-auth.guard';



const routes: Routes = [
  { path: 'employees', component: EmployeesComponent ,
    canActivate: [authGuard,roleAuthGuard],
    data:{
      role:["Employee.View","Admin"]
    },
   },
   {path:'employee/:id/edit', component:AddEmployeeComponent
   ,
   canActivate: [authGuard,roleAuthGuard],
   data:{

     role:["Admin","Employee.Create","Employee.Update"],
   },
   },
   {path:'employeedetails/:id', component:EmployeeDetailsComponent
   ,
   canActivate: [authGuard,roleAuthGuard],
   data:{
     role:["Admin","Employee.View"]
   },
   },

  { path: ' ', component: HomeComponent
  ,
  canActivate: [authGuard],
   },

  { path: 'salaryReport', component: SalaryReportComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","SalaryReport.View"]
  },
  },
  { path: 'attendenceReport', component: AttendenceComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","Attendance.View"]
  },
   },
   /////
  { path: 'holidays', component: HolidysComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","Holiday.View"]
  },
  ///////
  },
  { path: 'public-setting', component: PublicSettingComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","PublicSetting.View"]
  },

   },
   {path:'allUsers', component: AllUsersComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","Users.View"]
  },
  },
  { path: 'employees', component: EmployeesComponent },

  { path: '', component: HomeComponent },
  { path: 'salaryReport', component: SalaryReportComponent },
  { path: 'attendenceReport', component: AttendenceComponent },
  { path: 'holidays', component: HolidysComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  //{ path: '**', component: NotFoundComponent },
  {path:'user', component:UserComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","Users.Create"]
  },
  },
  {path:'login', component: LoginComponent ,
  canActivate: [priventLoginGuard],

  },
  //pemission
  { path: 'user', component: UserComponent },


  { path: 'permissions/:id/edit', component: AddPermissionComponent,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin"] },},
  { path: 'roles', component: RolesComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","Permissions.View"]
  },
  },


  {path:'addAttendence/:id/edit', component:  AddAttendenceComponent
  ,
  canActivate: [authGuard,roleAuthGuard],
  data:{
    role:["Admin","Attendence.Create"]
  },
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
