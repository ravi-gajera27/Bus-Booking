import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { PassingIdService } from '../service/passing-id.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  pages: any[];

  constructor(private http: HttpClient,
    private router: Router,
    private passingidservice:PassingIdService,) { }

  ngOnInit() {
    this.http.get(environment.api_url + `/admin/pages/`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.pages = data['data'];
    });
  }
  passId(id:any){
    this.passingidservice.sendToService(id);
    this.router.navigate(['/editpages',id]);
   }

}
