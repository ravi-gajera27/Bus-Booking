import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PassingidService } from '../service/passingid.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm:FormGroup;
  id: any;
  route:any;
  route_name: any;
  to_city: any;
  from_city: any;
  booking_date: any;
  arrival_time: any;
  journey_date: any;
  submitted=false;
  price: any;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder,
    private passingidservice:PassingidService,) { }

  ngOnInit() {
    this.bookingForm = this.fromBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      from_city: ['',[Validators.required]],
      to_city: ['',[Validators.required]],
      journey_date: ['',[Validators.required]],
      person: ['',[Validators.required]],
      time: ['',[Validators.required]],
      price: ['',[Validators.required]],
      mobileNo: ['',[Validators.required]],
      
    });
    this.id = this.passingidservice.sendToEdituser();
    this.http.get(environment.api_url + `/admin/get_route_by_id/`+this.id,{    
    }).subscribe(data=>{
        this.route =data['data'][0];
        //this.route_name = this.route['route_name'];
        this.from_city = this.route['from_city'];
        this.to_city = this.route['to_city'];
        this.journey_date = this.route['journey_date'];
        this.arrival_time = this.route['arrival_time'];

        console.log(this.from_city)

        this.bookingForm.patchValue({
          'from_city':this.from_city,
          'to_city':this.to_city,
          'journey_date':this.journey_date,
          'time':this.arrival_time,
        });
        
    });
    this.http.get(environment.api_url + `/api/route_by_id/`+this.id,{    
    }).subscribe(data=>{
        this.route =data['data'][0];
        this.price = this.route['price'];

        this.bookingForm.patchValue({
          'price':this.price,  
        });
        this.bookingForm.get('person').valueChanges.subscribe(num => {  
          this.bookingForm.patchValue({
            'price':this.countPrice(num)
          });
        });
        
    });
    
  }
  countPrice(totalPeople: number): number {
    //console.log(this.price * totalPeople);
    return this.price * totalPeople;
  } 

  get r(){
    return this.bookingForm.controls;
  }

  onSubmit(){
    //console.log('hello')
    this.submitted=true;
    if(this.r.name.value==""||this.r.email.value==""||this.r.to_city.value==""||this.r.from_city.value==""||this.r.journey_date.value==""||this.r.person.value==""||this.r.time.value==""||this.r.price.value==""||this.r.mobileNo.value==""){
      alert(this.r.name);
    }
    if(this.bookingForm.invalid){
      return;
    }
    this.http.post(environment.api_url + `/api/add_booking`,{
      "username": this.r.name.value,
      "email":this.r.email.value,
      "to_city":this.r.to_city.value,
      "from_city":this.r.from_city.value,
      "journey_date":this.r.journey_date.value,
      "total_user":this.r.person.value,
      "journey_time":this.r.time.value,
      "price":this.r.price.value,
      "mobileNo":this.r.mobileNo.value
    }).subscribe((data)=>{
      console.log(data);
      if(data['status']=='success'){
        alert('your ticket booked successfully');
        this.router.navigate(['/dashboard']);
      }else{
        alert("all field are required!");
      }
    });

  }

}
