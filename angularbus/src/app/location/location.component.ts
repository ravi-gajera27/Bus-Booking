import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  submitted = false; 
  addCityForm:FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('c') form:NgForm;
  @ViewChild('u') upForm:NgForm;
  @ViewChild('f') Form:NgForm;
  city: any[];
  state: any[];
  cityData: any;
  _id: any;
  state_name: any;
  city_name: any;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.addCityForm = this.fromBuilder.group({
      states: ['',[Validators.required]],
      city: ['',[Validators.required]],
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };
    this.http.get(environment.api_url + `/admin/get_city/`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.city = data['data'];
      //return this.user;
      this.dtTrigger.next();
    });
    this.http.get(environment.api_url + `/admin/get_all_state/`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.state = data['data'];
      
    });
  }

  get r(){
    return this.addCityForm.controls;
  }

  addCity(){
    this.submitted=true;
    if(this.r.states.value==""||this.r.city.value==""){
      alert("all parameters are required");
  }
  if(this.addCityForm.invalid){
    return;
  }
      this.http.post(environment.api_url + `/admin/add_city`,{
        "state": this.r.states.value,
        "city":this.r.city.value,
      }).subscribe((data)=>{
        console.log(data);
        if(data['status']=='success'){
          window.location.reload();
        }else{
          alert("all field are required!");
        }
      });
  }

  update(id:any){
    this.http.get(environment.api_url + `/admin/get_city_by_id/`+id,{
    }).subscribe((data:any[])=> {
      console.log(data);
      this.cityData = data;
  
      this._id = this.cityData.data[0]['_id'];
      this.state_name=this.cityData.data[0]['state']; 
      this.city_name=this.cityData.data[0]['city'];
      this.upForm.setValue({
      '_id':this._id,
      'state':this.state_name,
      'city':this.city_name,
      })
      
    });
  
  }
  onUpdate(upForm:NgForm){
    this.submitted=true;
    console.log(this.upForm.value)
    let value = this.upForm.value;
    this.http.post(environment.api_url + `/admin/update_city`,{
      "_id":value._id,
      "city": value.city,
      "state": value.state
    }).subscribe((data)=>{
      console.log(data);
      if(data['status']=='success'){
        window.location.reload();
      }else{
        alert("all field are required!");
      }
    });
  }

  modal(id:any){
    this.Form.setValue({
      '_id':id
    })   
  }
  onSubmit(Form:NgForm){
    this.submitted = true;
    console.log(this.Form.value)
    let value = this.Form.value;
    this.http.post(environment.api_url + `/admin/delete_city`,{
        "_id":value._id
    }).subscribe(data=>{
      if(data['status']=='success'){
          window.location.reload();
        }else{
          alert("something went wrong");
        }
    })

}


}
