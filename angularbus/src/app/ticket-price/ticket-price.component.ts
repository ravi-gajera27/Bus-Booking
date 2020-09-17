import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-price',
  templateUrl: './ticket-price.component.html',
  styleUrls: ['./ticket-price.component.css']
})
export class TicketPriceComponent implements OnInit {
  city: any;
  submitted = false; 
  ticketForm:FormGroup;
  route: any[];
  ticket: any[];
  ticketdata: any;
  _id: any;
  route_name: any;
  from_city: any;
  to_city: any;
  price: any;
  @ViewChild('u') form:NgForm;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {

    this.http.get(environment.api_url + `/admin/get_ticketPrice/`
    ).subscribe((data:any[])=> {
      console.log(data);
      this.ticket = data['data']; 
    });
  }
  update(id:any){
    this.http.get(environment.api_url + `/admin/get_ticket_by_id/`+id,{
    }).subscribe((data:any[])=> {
      console.log(data);
      this.ticketdata = data;
  
      this._id = this.ticketdata.data[0]['_id'];
      this.route_name=this.ticketdata.data[0]['route_name']; 
      this.from_city=this.ticketdata.data[0]['from_city'];
      this.to_city=this.ticketdata.data[0]['to_city'];
      this.price=this.ticketdata.data[0]['price']; 
      //console.log(this.);
      this.form.setValue({
      '_id':this._id,
      'route_name':this.route_name,
      'from_city':this.from_city,
      'to_city':this.to_city,
      'price':this.price,
      });
     
    }); 
  }

  onUpdate(form:NgForm){
    this.submitted=true;
      //console.log(this.upForm.value)
      let value = this.form.value;
      this.http.post(environment.api_url + `/admin/update_ticketPrice`,{
        '_id':value._id,
        'route_name':value.route_name,
        'from_city':value.from_city,
        'to_city':value.to_city,
        'price':value.price,
      }).subscribe((data)=>{
        console.log(data);
        if(data['status']=='success'){
          window.location.reload();
        }else{
          alert("all field are required!");
        }
      });
  }

}
