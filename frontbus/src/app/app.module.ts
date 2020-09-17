import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './booking/booking.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { LoginComponent } from './login/login.component';
import { ThankyoupageComponent } from './thankyoupage/thankyoupage.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    BookingComponent,
    ContactusComponent,
    AboutComponent,
    LoginComponent,
    ThankyoupageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    DataTablesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DatePickerModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path : "",
        component:DashboardComponent
      },
      {
        path : "dashboard",
        component:DashboardComponent
      },
      {
        path : "login",
        component:LoginComponent
      },
      {
        path : "contactus",
        component:ContactusComponent
      },
      {
        path : "booking/:_id",
        component:BookingComponent
      },
      {
        path : "register",
        component:RegisterComponent
      },
      {
        path : "about",
        component:AboutComponent
      },
      {
        path : "thankyou",
        component:ThankyoupageComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
