import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-addroute',
  templateUrl: './addroute.component.html',
  styleUrls: ['./addroute.component.css']
})
export class AddrouteComponent implements OnInit {
  city: any;
  submitted = false; 
  routeForm:FormGroup;
  limitSelection = false;
  selectedItems: any = [];
  dropdownSettings: any = {};
  citydata: any[];
  dropdownList: any[];
  dropdown: any ={};

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {

    this.routeForm = this.fromBuilder.group({
      route_name: ['',[Validators.required]],
      from_city: ['',[Validators.required]],
      to_city: ['',[Validators.required]],
      stoppage_point: ['',[Validators.required]],
      approx_time: ['',[Validators.required]],
      arrival_time: ['',[Validators.required]],
      distance: ['',[Validators.required]],
      journey_date: ['',[Validators.required]],
    });

    
     
      /*var i; 
      for(i=0;i<=8;i++){
        console.log(this.city.data[i]["city"]);
      }*/
      this.getData(); // call service here

      this.dropdownSettings = {
        singleSelection: false,
        //idField: 'item_id',
        //textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };

      this.dropdown = {
        singleSelection: true,
        //idField: 'item_id',
        //textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };

    
  }

  getData(): void {
    let tmp = [];
    this.http.get<any>(environment.api_url + `/admin/get_only_city/`).subscribe(data => {
      this.city=data;
      for(let i=0; i < this.city['data'].length; i++) {
        tmp.push(this.city.data[i]["city"]);
      }
      this.dropdownList = tmp;
      console.log(this.dropdownList);
    });
  }
  
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);

  }

   get r(){
    return this.routeForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.r.route_name.value=="" || this.r.journey_date.value==""||this.r.from_city.value==""||this.r.to_city.value==""||this.r.stoppage_point.value==""||this.r.approx_time.value==""||this.r.arrival_time.value==""||this.r.distance.value==""){
      alert("all parameters are required");
  }
  if(this.routeForm.invalid){
    return;
  }
      this.http.post(environment.api_url + `/admin/add_route`,{
        "route_name": this.r.route_name.value,
        'journey_date':this.r.journey_date.value,
        "from_city":this.r.from_city.value,
        "to_city":this.r.to_city.value,
        "stoppage_point":this.r.stoppage_point.value,
        "approx_time":this.r.approx_time.value,
        "arrival_time":this.r.arrival_time.value,
        "distance":this.r.distance.value
      }).subscribe((data)=>{
        console.log(data);
        if(data['status']=='success'){
          this.router.navigate(['/routes']);
        }else{
          alert("all field are required!");
        }
      });
  }
  
}
