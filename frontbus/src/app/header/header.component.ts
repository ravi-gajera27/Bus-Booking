import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginForm : FormGroup;
  submitted = false; 
  registerForm:FormGroup;
  name: string;
  email: string;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    this.email=localStorage.getItem('name');
    }
  

  userLogout(){
    localStorage.clear(); 
    this.router.navigate(['/dashboard']);
  }


}
