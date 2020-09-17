import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { TreeViewModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule, ToolbarService, QuickToolbar, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UsersComponent } from './users/users.component';
import { ReportComponent } from './report/report.component';
import { RoutesComponent } from './routes/routes.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdduserComponent } from './adduser/adduser.component';
import { LocationComponent } from './location/location.component';
import { TicketPriceComponent } from './ticket-price/ticket-price.component';
import { AddbookingComponent } from './addbooking/addbooking.component';
import { BookingreportComponent } from './bookingreport/bookingreport.component';
import { PagesComponent } from './pages/pages.component';
import { SettingComponent } from './setting/setting.component';
import { EmailformatComponent } from './emailformat/emailformat.component';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import * as bootstrap from "bootstrap";
import * as AnythingThatIsNotDollarSignOrSymbolOrjQuery from "jquery"
import * as $ from 'jquery';
import 'datatables.net';
import { AddrouteComponent } from './addroute/addroute.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddticketComponent } from './addticket/addticket.component';
import { EditemailComponent } from './editemail/editemail.component';
import { EditpagesComponent } from './editpages/editpages.component';
import { EditrouteComponent } from './editroute/editroute.component';
import { AbcdComponent } from './abcd/abcd.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   
    AdmindashboardComponent,
    UsersComponent,
    ReportComponent,
    RoutesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdduserComponent,
    LocationComponent,
    LoginComponent,
    TicketPriceComponent,
    AddbookingComponent,
    BookingreportComponent,
    PagesComponent,
    SettingComponent,
    EmailformatComponent,
    BookinglistComponent,
    AddrouteComponent,
    AddticketComponent,
    EditemailComponent,
    EditpagesComponent,
    EditrouteComponent,
    AbcdComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RichTextEditorAllModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    DatePickerModule,
    TimePickerModule,
    TreeViewModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgMultiSelectDropDownModule,
    RouterModule.forRoot([
      {
        path : "",
        component:LoginComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"admindashboard",
        component:AdmindashboardComponent
      },
      {
        path:"users",
        component:UsersComponent,
        data: { activatedmenu: "users"}
      },
      {
        path:'adduser',
        component:AdduserComponent,
        data: { activatedmenu: "adduser"}
      },
      {
        path:"location",
        component:LocationComponent
      },
      {  
        path:"setting",
        component:SettingComponent,    
      },
      {  
        path:"pages",
        component:PagesComponent,    
      },
      {  
        path:"emailformat",
        component:EmailformatComponent,    
      },
      {  
        path:"bookinglist",
        component:BookinglistComponent,    
      },
      {  
        path:"addbooking",
        component:AddbookingComponent,    
      },
      {  
        path:"ticket-price",
        component:TicketPriceComponent,    
      },
      {  
        path:"routes",
        component:RoutesComponent,    
      },
      {  
        path:"report",
        component:ReportComponent,    
      },
      {  
        path:"bookingreport",
        component:BookingreportComponent,    
      },
      {  
        path:"addroute",
        component:AddrouteComponent,    
      },
      {  
        path:"addticket",
        component:AddticketComponent,    
      },
      {  
        path:"editemail/:id",
        component:EditemailComponent,    
      },
      {  
        path:"editpages/:id",
        component:EditpagesComponent,    
      },
      {  
        path:"editroute/:id",
        component:EditrouteComponent,    
      },
      
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  providers: [ToolbarService,QuickToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }