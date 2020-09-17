import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactForm:FormGroup;
  submitted = false;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.fromBuilder.group({
      email: ['',[Validators.required]],
      name: ['',[Validators.required]],
      subject: ['',[Validators.required]],
      message: ['',[Validators.required]],
    });
  }
 
  get r(){
    return this.contactForm.controls;
  }

  onSubmit(){
    if(this.r.name.value==""||this.r.email.value==""||this.r.subject.value==""||this.r.message.value==""){
        alert("all parameters are required");
    }
    if(this.contactForm.invalid){
      return;
    }
    this.http.post(environment.api_url+`/api/contactUs`,{
      'name':this.r.name.value,
      'email':this.r.email.value,
      'subject':this.r.subject.value,
      'message':this.r.message.value
    }).subscribe(data=>{
      console.log(data);
      if(data['status']=='success'){
        alert("your message/suggestion sent successfully..!");
        this.router.navigate(['/dashboard']);
      }else{
        alert('something went wrong');
      }
    });
  }

}
