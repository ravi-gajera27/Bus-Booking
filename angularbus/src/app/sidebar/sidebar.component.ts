import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Routes, RouterModule} from '@angular/router';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  
  ngOnInit() {
    this.loadScript('assets/js/sidebar.js');
  }

 
}
