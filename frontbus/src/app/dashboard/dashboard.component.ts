import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { PassingidService } from '../service/passingid.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  city: any;
  searchForm:FormGroup;
  submitted=false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  route: any;
  limitSelection = false;
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownList: any[];
  booking: any=[];
  

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder,
    private passingidservice:PassingidService,) { }

    getData(): void {
      let tmp = [];
      this.http.get<any>(environment.api_url + `/admin/get_only_city`).subscribe(data => {
        this.city=data;
        for(let i=0; i < this.city['data'].length; i++) {
          tmp.push(this.city.data[i]["city"]);
        }
        this.dropdownList = tmp;
        
        //console.log(this.dropdownList);
      });
    }

  ngOnInit() {
    this.getData(); // call service here

      this.dropdownSettings = {
        singleSelection: true,
        //idField: 'item_id',
        //textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit:5,
        allowSearchFilter: true
      };
    this.searchForm = this.fromBuilder.group({
      from_city: ['',[Validators.required]],
      to_city: ['',[Validators.required]],
      journey_date: ['',[Validators.required]],
    });

  }
  get r(){
    return this.searchForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    
    if(this.r.journey_date.value==""||this.r.from_city.value==""||this.r.to_city.value==""){
      alert("all parameters are required");
    }
    if(this.searchForm.invalid){
      return;
    }
        this.http.post(environment.api_url + `/api/search_routes`,{
         
          "from_city":this.r.from_city.value,
          "to_city":this.r.to_city.value,
          "journey_date":this.r.journey_date.value,
          
        }).subscribe((data)=>{
          if(data['status']=='success'){
              
              this.booking=data['data'];
              console.log(this.booking);
          }else{
            alert("Service Not Available");
          }


        });
  }

  passId(id:any){
    this.passingidservice.sendToService(id);
    this.router.navigate(['/booking',id]);
   }
  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
