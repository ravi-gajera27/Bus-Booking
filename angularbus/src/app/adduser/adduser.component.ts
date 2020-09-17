import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  addUserForm : FormGroup;
  submitted = false;  
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addUserForm = this.fromBuilder.group({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      username: ['',[Validators.required]],
      email: ['',[Validators.required]],
      mobileno: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirm_password: [''],
    });
  }

  get r(){
    return this.addUserForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.r.firstname.value == ""  || this.r.lastname.value == "" || this.r.username.value == "" || this.r.email.value == "" ||this.r.mobileno.value=="" || this.r.password.value == "" || this.r.confirm_password.value == "" ){
      alert("all field are required");  
    }
    if(this.addUserForm.invalid){
      return;
    }
    this.http.post(environment.api_url + `/admin/add_user`,{
      "firstname": this.r.firstname.value,
      "lastname": this.r.lastname.value,
      "username": this.r.username.value,
      "email": this.r.email.value,
      "mobileNo": this.r.mobileno.value,
      "password": this.r.password.value,
      "confirmpassword": this.r.confirm_password.value,
    }).subscribe((data)=>{
      console.log(data);
      if(data['status'] == "success"){
        this.router.navigate(['/users']);
      }else{
        alert("something went wrong");
      }
    });

  }

}
