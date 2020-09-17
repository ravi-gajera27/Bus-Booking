import {AfterViewInit, Component, OnInit ,OnDestroy, ViewChild } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule, FormGroup,FormBuilder,Validators, NgForm } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
//import { Subscription } from 'rxjs/Subscription';
import * as $ from 'jquery';
import 'datatables.net';
import { PassingIdService } from '../service/passing-id.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user:String [];
  id:any;
  submitted = false; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('f') form:NgForm;
  @ViewChild('u') upForm:NgForm;
  users: any;
  _id: any;
  firstname: any;
  lastname: any;
  username: any;
  email: any;
  mobileno: any;

  constructor(private http: HttpClient,
    private router: Router,
    private passingidservice:PassingIdService,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };
    this.http.get(environment.api_url + `/admin/get_all_users/`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.user = data['data'];
      //return this.user;
      this.dtTrigger.next();
    });

  }

  passId(id:any){
    this.passingidservice.sendToService(id);
    this.router.navigate(['/edituser',id]);
   }

  modal(id:any){
    this.passingidservice.sendToService(id);
    this.id = this.passingidservice.sendToEdituser();
    this.form.setValue({
      'user_id':this.id
    })
    //console.log(this.id);
  }

  onSubmit(form:NgForm){
    this.submitted = true;
    //console.log(this.form.value)
    let value = this.form.value;
    this.http.post(environment.api_url + `/admin/delete_user`,{
        "user_id":value.user_id
    }).subscribe(data=>{
      if(data['status']=='success'){
          window.location.reload();
        }else{
          alert("something went wrong");
        }
    })

}

update(id:any){
  this.http.get(environment.api_url + `/admin/get_user_by_id/`+id,{
  }).subscribe((data:any[])=> {
    console.log(data);
    this.users = data;

    this._id = this.users.data[0]['_id'];
    this.firstname=this.users.data[0]['firstname']; 
    this.lastname=this.users.data[0]['lastname'];
    this.username=this.users.data[0]['username'];
    this.email=this.users.data[0]['email'];
    this.mobileno=this.users.data[0]['mobileNo'];
   
    this.upForm.setValue({
    'user_id':this._id,
    'firstname':this.firstname,
    'lastname':this.lastname,
    'username':this.username,
    'email':this.email,
    'mobileno':this.mobileno
    })
    //console.log(this.form.value)
  });

}

  onUpdate(upForm:NgForm){
    this.submitted=true;
      //console.log(this.upForm.value)
      let value = this.upForm.value;
      this.http.post(environment.api_url + `/admin/update_user`,{
        "_id":value.user_id,
        "firstname": value.firstname,
        "lastname": value.lastname,
        "username": value.username,
        "email": value.email,
        "mobileNo": value.mobileno
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
