import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm } from '@angular/forms';
import { PassingIdService } from '../service/passing-id.service';
import { Toolbar, QuickToolbar } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-editpages',
  templateUrl: './editpages.component.html',
  styleUrls: ['./editpages.component.css']
})
export class EditpagesComponent implements OnInit {

  @ViewChild('p') upForm:NgForm;
  @ViewChild('Toolbar') tools:Toolbar;
  @ViewChild('QuickToolbar') quickTools:QuickToolbar;
  id: any;
  page: any;
  _id: any;
  title: any;
  keyword: any;
  meta_title: any;
  meta_description: any;
  short_description: any;
  description: any;
  submitted=false;

  constructor(private http: HttpClient,
    private router: Router,
    private passingidservice:PassingIdService,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.passingidservice.sendToEdituser();
    this.http.get(environment.api_url + `/admin/get_page_by_id/`+this.id,{
    }).subscribe((data:any[])=> {
      console.log(data);
      this.page = data;
  
      this._id = this.page.data[0]['_id'];
      this.title=this.page.data[0]['title']; 
      this.meta_title=this.page.data[0]['meta_title'];
      this.keyword=this.page.data[0]['keyword'];
      this.meta_description=this.page.data[0]['meta_description']; 
      this.short_description=this.page.data[0]['short_description'];
      this.description=this.page.data[0]['description'];
      //console.log(this.description);
      this.upForm.setValue({
      '_id':this._id,
      'title':this.title,
      'meta_title':this.meta_title,
      'keyword':this.keyword,
      'meta_description':this.meta_description,
      'short_description':this.short_description,
      'description':this.description
      });
     
    }); 
  }

  onSubmit(upForm:NgForm){
    this.submitted=true;
      //console.log(this.upForm.value)
      let value = this.upForm.value;
      this.http.post(environment.api_url + `/admin/edit_pages`,{
        '_id':value._id,
        'title':value.title,
        'meta_title':value.meta_title,
        'keyword':value.keyword,
        'meta_description':value.meta_description,
        'short_description':value.short_description,
        'description':value.description
      }).subscribe((data)=>{
        console.log(data);
        if(data['status']=='success'){
          alert("data updated successfully");
          this.router.navigate(['/pages']);
        }else{
          alert("all field are required!");
        }
      });
  }

}
