import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm } from '@angular/forms';
import { PassingIdService } from '../service/passing-id.service';
import { Toolbar, QuickToolbar } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-editemail',
  templateUrl: './editemail.component.html',
  styleUrls: ['./editemail.component.css']
})
export class EditemailComponent implements OnInit {

  @ViewChild('Toolbar') tools:Toolbar;
  @ViewChild('QuickToolbar') quickTools:QuickToolbar;
  id: any;
  title: any;
  subject: any;
  emaildata: any;
  @ViewChild('ef') upForm:NgForm;
  emailf: any;
  email: any;
  _id: any;
  submitted=false;

  constructor(private http: HttpClient,
    private router: Router,
    private passingidservice:PassingIdService,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.passingidservice.sendToEdituser();
    this.http.get(environment.api_url + `/admin/get_email_by_id/`+this.id,{
    }).subscribe((data:any[])=> {
      console.log(data);
      this.emaildata = data;
  
      this._id = this.emaildata.data[0]['_id'];
      this.title=this.emaildata.data[0]['title']; 
      this.subject=this.emaildata.data[0]['subject'];
      this.email=this.emaildata.data[0]['email'];

      this.upForm.setValue({
      '_id':this._id,
      'title':this.title,
      'subject':this.subject,
      'email':this.email
      })
    }) 
  }

  onSubmit(upForm:NgForm){
    this.submitted=true;
      //console.log(this.upForm.value)
      let value = this.upForm.value;
      this.http.post(environment.api_url + `/admin/edit_emailFormat`,{
        '_id':value._id,
        "title": value.title,
        "subject": value.subject,
        "email": value.email,
      }).subscribe((data)=>{
        console.log(data);
        if(data['status']=='success'){
          this.router.navigate(['/emailformat']);
        }else{
          alert("all field are required!");
        }
      });
  }
  

}
