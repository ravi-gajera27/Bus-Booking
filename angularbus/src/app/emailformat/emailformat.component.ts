import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, NgForm } from '@angular/forms';
import { PassingIdService } from '../service/passing-id.service';

@Component({
  selector: 'app-emailformat',
  templateUrl: './emailformat.component.html',
  styleUrls: ['./emailformat.component.css']
})
export class EmailformatComponent implements OnInit {
  email: any;

  constructor(private http: HttpClient,
    private router: Router,
    private passingidservice:PassingIdService,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.http.get(environment.api_url + `/admin/emailFormat/`
      ).subscribe((data:any[])=> {
        console.log(data);
        this.email = data['data']; 
      });
  }
  update(id:any){
    this.passingidservice.sendToService(id);
    this.router.navigate(['/editemail',id]);
   }
  
}
