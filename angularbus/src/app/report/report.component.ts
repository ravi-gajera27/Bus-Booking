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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

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
      ajax: environment.api_url + `/admin/get_all_users`,
      columns: [
        
        {
          title: 'FirstName',
          data: 'firstname'
        },
        {
          title: 'LastName',
          data: 'lastname'
        },
        {
          title: 'Username',
          data: 'username'
        },
        {
          title: 'Email',
          data: 'email'
        },
        {
          title: 'Mobile No',
          data: 'mobileNo'
        },
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
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
