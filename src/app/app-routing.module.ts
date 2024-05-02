import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSettingComponent } from './components/public-setting/public-setting.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployessComponent } from './components/employess/employess.component';

const routes: Routes = [
  { path: '', component: EmployessComponent },
  { path: 'public-setting', component: PublicSettingComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
