import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PublicSettingComponent } from './components/public-setting/public-setting.component';
import { HolidysComponent } from './components/holidys/holidys.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { EmployessComponent } from './components/employess/employess.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
   
    SidebarComponent,
         PublicSettingComponent,
         HolidysComponent,
         SalaryReportComponent,
         EmployessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
