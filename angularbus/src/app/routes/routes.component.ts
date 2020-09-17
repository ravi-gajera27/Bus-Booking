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
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  route: any[];
  _id: any;
  status: any;
  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder,
    private passingidservice:PassingIdService,
    private renderer: Renderer,) { }

    

  ngOnInit() {
      
    this.dtOptions = {
      ajax: environment.api_url + `/admin/get_all_routes/`,
      columns: [
        {
          title: 'Route',
          data: 'route_name'
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
          title: 'Stoppage Point',
          data: 'stoppage_point'
        },
        {
          title: 'Distance',
          data: 'distance'
        },
        {
          title: 'Arrival Time',
          data: 'arrival_time'
        },
        {
          title: 'Approx Time(Hr)',
          data: 'approx_time'
        },
        {
          title: 'Status',
          render: function (data: any, type: any, full: any, row: any) {
            if (full.status == true) {
              return '<a  class="btn btn-success" data-toggle="modal" data-target="#edit_status" modal-id="' + full._id + '" >Enable</a>';
            } else {
              return '<a  class="btn btn-danger" data-toggle="modal" data-target="#edit_status" modal-id="' + full._id + '" >Disable</a>';
            }
          }
        },
        {
          title: 'Action',
          render: function (data: any, type: any, full: any) {

             return '<button href="editroute" class="btn btn-primary pointer" id="' + full._id + '" >Edit</button>';

          }
        }

      ]

    };

  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute("modal-id")) {
          this.get_modal_data(event.target.getAttribute('modal-id'));
      }
      if (event.target.hasAttribute("id")) {

        this.router.navigate(['editroute/' + event.target.getAttribute("id")]);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender_new(): void {
  
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }

  get_modal_data(id){
    this.http.get(environment.api_url + `/admin/get_route_by_id/`+id,{
    }).subscribe(data=>{
      this._id=data['data'][0]['_id'];
      this.status=data['data'][0]['status'];
      //console.log(this._id);
    })
  }

  onvalue(status:Boolean) {
    if (status == true) {
      var update_status = 0;

    } else {
      var update_status = 1;
    }

    this.http.post(environment.api_url + `/admin/update_status`, {

      "_id": this._id,
      "status": update_status,
      "table": "routes"


    })
      .subscribe((data) => {

        if (data['status'] == 'success') {
          //let modal_element: HTMLElement = document.getElementById("edit_status") as HTMLElement;
          //$("#edit_status").modal("hide");  
          window.location.reload();
          //this.router.navigate(['/routes']);
          this.rerender_new();
          return;
        } else {
         
          window.location.reload();
          return;
        }
      }, error => {

        alert('Error Occurred. Try Again!');
        return;
      });

  }

}
