import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployessComponent } from './components/employess/employess.component';
import { HolidysComponent } from './components/holidys/holidys.component';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
=======
import { AttendanceComponent } from './components/attendance/attendance.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
>>>>>>> f09bb58a8d3b11a44b1de0861098c03f5f950922

const routes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: 'salaryReport', component: SalaryReportComponent },
  { path: 'attendenceReport', component: AttendanceComponent },
  { path: 'holidays', component: HolidysComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  { path: '**', component: NotFoundComponent },
  {path:'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
