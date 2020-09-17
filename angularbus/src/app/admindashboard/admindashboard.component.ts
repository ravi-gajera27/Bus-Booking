import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import {Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { FormsModule, FormBuilder } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  user: any;
  booking: any;
  routes: any;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.http.get(environment.api_url + `/admin/count_user/`,{  
    }).subscribe((data:any)=>{
      console.log(data);
      this.user = data['data'];
      //this.users = this.user.data;
    });
    this.http.get(environment.api_url + `/admin/count_routes/`,{  
    }).subscribe((data:any)=>{
      console.log(data);
      this.routes = data['data'];
      //this.users = this.user.data;
    });
    this.http.get(environment.api_url + `/admin/count_booking/`,{  
    }).subscribe((data:any)=>{
      console.log(data);
      this.booking = data['data'];
      //this.users = this.user.data;
    });
  }

}
