import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  get r(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.r.username.value == "" || this.r.password.value == ""){
      alert("please enter username or password");  
    }
    if(this.loginForm.invalid){
      return;
    }
    this.http.post(environment.api_url + `/admin/login`,{
      "username": this.r.username.value,
      "password": this.r.password.value,
     
    }).subscribe((data)=>{
      console.log(data);
      if(data['status'] == "success"){
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.r.username.value);
        this.router.navigate(['/admindashboard']);
      }else{
        alert("username or password invalid");
      }
      //this.router.navigate(['/dashboard']);
    });

  }

}
