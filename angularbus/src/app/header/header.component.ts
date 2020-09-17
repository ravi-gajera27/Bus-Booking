import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string;
  @ViewChild('up') upassForm:NgForm;
  changePassForm:FormGroup;
  submitted=false;

  constructor(private http: HttpClient,
    private router: Router,) { }

  ngOnInit() {
    this.name = localStorage.getItem('token');
  }
  updatepass(name:any){
    console.log(name);
    this.upassForm.setValue({
      'username':name,
      'oldpassword':'',
      'newpassword':'',
      'confirmpassword':''
    })
  }

  onUpdatePass(upassForm:NgForm){
    this.submitted=true;
      //console.log(this.upForm.value)
      let value = this.upassForm.value;
      if(value.username == ""||value.oldpassword == ""||value.newpassword==""||value.confirmpassword==""){
        alert("all parameters are required");
      }else{
        this.http.post(environment.api_url + `/admin/changePassword`,{
          "username":value.username,
          "oldpassword": value.oldpassword,
          "newpassword": value.newpassword,
          "confirmpassword": value.confirmpassword,
        }).subscribe((data)=>{
          console.log(data);
          if(data['status']=='success'){
            alert("your password change successfully!");
            window.location.reload();
          }else{
            alert("Something Went Wrong...!");
          }
        });
      }
      
  }

  logout(){
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }

}
