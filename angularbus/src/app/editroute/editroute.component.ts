import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { PassingIdService } from '../service/passing-id.service';

@Component({
  selector: 'app-editroute',
  templateUrl: './editroute.component.html',
  styleUrls: ['./editroute.component.css']
})
export class EditrouteComponent implements OnInit {
  //@ViewChild('u') routeForm:NgForm;
  routeForm:FormGroup;
  city: any;
  id: any;
  route: any;
  _id: any;
  route_name: any;
  to_city: any;
  stoppage_point: any;
  from_city: any;
  approx_time: any;
  arrival_time: any;
  distance: any;
  submitted=false;
  journey_date: any;
  limitSelection = false;
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownList: any[];


  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder,
    private passingidservice:PassingIdService,
    private activatedRoute:ActivatedRoute) {
      this.id=activatedRoute.snapshot.url[1].path;
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

  ngOnInit() {
    this.routeForm = this.fromBuilder.group({
      _id: ['',[Validators.required]],
      route_name: ['',[Validators.required]],
      from_city: ['',[Validators.required]],
      to_city: ['',[Validators.required]],
      stoppage_point: ['',[Validators.required]],
      approx_time: ['',[Validators.required]],
      arrival_time: ['',[Validators.required]],
      distance: ['',[Validators.required]],
      journey_date: ['',[Validators.required]],
    });
    
    this.getData(); // call service here

      this.dropdownSettings = {
        singleSelection: false,
        //idField: 'item_id',
        //textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit:5,
        allowSearchFilter: true
      };
    //this.id = this.passingidservice.sendToEdituser();
    this.http.get(environment.api_url + `/admin/get_route_by_id/`+this.id,{
    }).subscribe((data:any[])=> {
      console.log(data);
      this.route = data;
  
      this._id = this.route.data[0]['_id'];
      this.route_name=this.route.data[0]['route_name']; 
      this.from_city=this.route.data[0]['from_city'];
      this.to_city=this.route.data[0]['to_city'];
      this.stoppage_point=this.route.data[0]['stoppage_point']; 
      this.approx_time=this.route.data[0]['approx_time'];
      this.arrival_time=this.route.data[0]['arrival_time'];
      this.distance=this.route.data[0]['distance'];
      this.journey_date=this.route.data[0]['journey_date'];
      //console.log(this.stoppage_point);
      this.routeForm.patchValue({
      '_id':this._id,
      'route_name':this.route_name,
      'journey_date':this.journey_date,
      //'from_city':this.from_city,
      //'to_city':this.to_city,
      //'stoppage_point':this.stoppage_point,
      'approx_time':this.approx_time,
      'arrival_time':this.arrival_time,
      'distance':this.distance,
      });  
      //console.log(this.routeForm.setValue);
    }); 
    

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
      this.http.post(environment.api_url + `/admin/update_route`,{
        '_id':this.r._id.value,
        'route_name':this.r.route_name.value,
        'from_city':this.r.from_city.value,
        'to_city':this.r.to_city.value,
        'stoppage_point':this.r.stoppage_point.value,
        'approx_time':this.r.approx_time.value,
        'arrival_time':this.r.arrival_time.value,
        'distance':this.r.distance.value,
        'journey_date':this.r.journey_date.value
      }).subscribe((data)=>{
        console.log(data);
        if(data['status']=='success'){
          this.router.navigate(['/routes']);
        }else{
          alert("all field are required!");
        }
      });
  }
 
  onItemSelect(event){

  }


}
