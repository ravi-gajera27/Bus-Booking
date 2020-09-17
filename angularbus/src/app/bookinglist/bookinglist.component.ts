import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  booking: any[];
  
  constructor(private http: HttpClient,
    private router: Router,) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };
    this.http.get(environment.api_url + `/admin/get_all_booking`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.booking = data['data'];
      //return this.user;
      this.dtTrigger.next();
    });

  }

}
