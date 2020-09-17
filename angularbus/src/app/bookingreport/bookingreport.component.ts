import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { PassingIdService } from '../service/passing-id.service';
import { DataTableDirective } from 'angular-datatables';
import * as $AB from 'jquery';

@Component({
  selector: 'app-bookingreport',
  templateUrl: './bookingreport.component.html',
  styleUrls: ['./bookingreport.component.css']
})
export class BookingreportComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient,
    private router: Router,
    private renderer: Renderer,) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      ajax: environment.api_url + `/admin/get_all_booking`,
      columns: [
        {
          title: 'Username',
          data: 'username'
        },
        {
          title: 'Pick Up',
          data: 'from_city'
        },
        {
          title: 'Destination',
          data: 'to_city'
        },
        {
          title: 'Booking Date',
          data: 'booking_date'
        },
        {
          title: 'Journey Date',
          data: 'journey_date'
        },
        {
          title: 'Total User',
          data: 'total_user'
        },
        {
          title: 'Price',
          data: 'price'
        },
        {
          title: 'Mobile No',
          data: 'mobileNo'
        },
        {
          title: 'Email',
          data: 'email'
        },
        {
          title: 'Journey Time',
          data: 'journey_time'
        }
      ],
      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel',
      ]

    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    /*this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.header()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });*/
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
