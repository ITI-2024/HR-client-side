import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployessComponent } from './components/employess/employess.component';
import { HolidysComponent } from './components/holidys/holidys.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';

const routes: Routes = [
  { path: '', component: AttendanceComponent },
  { path: 'salaryReport', component: SalaryReportComponent },
  { path: 'attendenceReport', component: AttendanceComponent },
  { path: 'holidays', component: HolidysComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
