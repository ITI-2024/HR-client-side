import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { HolidysComponent } from './components/holidys/holidys.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'holidays', component: HolidysComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  { path: 'employees', component:  EmployeesComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
