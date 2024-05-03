import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PublicSettingComponent } from './components/public-setting/public-setting.component';
import { HolidysComponent } from './components/holidys/holidys.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicSettingPopUpComponent } from './components/public-setting/public-setting-pop-up/public-setting-pop-up.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PublicSettingComponent,
    HolidysComponent,
    SalaryReportComponent,
    EmployeesComponent,
    PublicSettingPopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
