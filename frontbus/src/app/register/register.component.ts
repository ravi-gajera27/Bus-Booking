import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  submitted=false;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fromBuilder.group({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      username: ['',[Validators.required]],
      email: ['',[Validators.required]],
      mobileNo: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmpassword: ['',[Validators.required]],
    });
  }

  get r(){
    return this.registerForm.controls;
  }


  onSubmit(){
  this.submitted=true;
    if(this.r.firstname.value == ""  || this.r.lastname.value == "" || this.r.username.value == "" || this.r.email.value == "" ||this.r.mobileNo.value=="" || this.r.password.value == "" || this.r.confirmpassword.value == "" ){
      alert("all field are required");  
    }
    if(this.registerForm.invalid){
      return;
    }
    this.http.post(environment.api_url + `/api/register`,{
      "firstname": this.r.firstname.value,
      "lastname": this.r.lastname.value,
      "username": this.r.username.value,
      "email": this.r.email.value,
      "mobileNo": this.r.mobileNo.value,
      "password": this.r.password.value,
      "confirmpassword": this.r.confirmpassword.value,
    }).subscribe((data)=>{
      console.log(data);
      if(data['status'] == "success"){
        alert("registration done successfully...!");
        this.router.navigate(['/login']);
        //window.location.reload();
      }else{
        alert("email already exixts...!");
      }
    });

}

}
