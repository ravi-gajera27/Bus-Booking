import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted=false;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });


  }

  get l(){
    return this.loginForm.controls;
  }


  onSubmit(){
    
    this.submitted=true;
    if(this.l.email.value == ""|| this.l.password.value == ""){
      alert("all field are required");  
    }
    if(this.loginForm.invalid){
      return;
    }
    this.http.post(environment.api_url + `/api/login`,{
      "email": this.l.email.value,
      "password": this.l.password.value,
     
    }).subscribe((data)=>{
      console.log(data);
      if(data['status'] == "success"){
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('name', this.l.email.value);
        alert("login successfully...!");
        this.router.navigate(['/dashboard']);
      }else{
        alert("username or password invalid");
      }
      //this.router.navigate(['/dashboard']);
    });
}

}
