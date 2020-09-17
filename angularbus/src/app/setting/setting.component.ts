import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  setting: any;
  _id: any;
  title: any;
  value: any;
  @ViewChild('u') upForm:NgForm;
  valueField: any;
  submitted=false;

  constructor(private http: HttpClient,
    private router: Router,) { }

  ngOnInit() {
    this.http.get(environment.api_url + `/admin/setting/`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.setting = data['data'];
    });
  }

  update(id:any){
    this.http.get(environment.api_url + `/admin/get_field_by_id/`+id,{
    }).subscribe((data:any[])=> {
      console.log(data);
      this.setting = data;
  
      this._id = this.setting.data[0]['_id'];
      this.title=this.setting.data[0]['title']; 
      this.valueField=this.setting.data[0]['value'];

      this.upForm.setValue({
      '_id':this._id,
      'title':this.title,
      'valueField':this.valueField,
      })
      
    });
  
  }

  onSubmit(upForm:NgForm){
    this.submitted=true;
    //console.log(this.upForm.value)
    let value = this.upForm.value;
    this.http.post(environment.api_url + `/admin/edit_setting`,{
      "_id":value._id,
      "title": value.title,
      "value": value.valueField
    }).subscribe((data)=>{
      console.log(data);
      if(data['status']=='success'){
        window.location.reload();
      }else{
        alert("all field are required!");
      }
    });
  }

}
