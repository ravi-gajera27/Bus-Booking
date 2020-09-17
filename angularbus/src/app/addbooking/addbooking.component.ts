import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.css']
})
export class AddbookingComponent implements OnInit {
  bookingForm:FormGroup;
  city: any;
  submitted=false;
  price: any;
  Price: number;
  limitSelection = false;
  selectedItems: any = [];
  dropdownSettings: any = {};
  citydata: any[];
  dropdownList: any[];

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.bookingForm = this.fromBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      from_city: ['',[Validators.required]],
      to_city: ['',[Validators.required]],
      //booking_date: ['',[Validators.required]],
      journey_date: ['',[Validators.required]],
      person: ['',[Validators.required]],
      time: ['',[Validators.required]],
      price: ['',[Validators.required]],
      mobileNo: ['',[Validators.required]],
    });

    this.getData(); // call service here

      this.dropdownSettings = {
        singleSelection: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };
   
  }

  getData(): void {
    let tmp = [];
    this.http.get<any>(environment.api_url + `/admin/get_only_city/`).subscribe(data => {
      this.city=data;
      for(let i=0; i < this.city['data'].length; i++) {
        tmp.push(this.city.data[i]["city"]);
      }
      this.dropdownList = tmp;
      console.log(this.dropdownList);
    });
  }

  get r(){
    return this.bookingForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.r.name.value==""||this.r.email.value==""||this.r.to_city.value==""||this.r.from_city.value==""||this.r.journey_date.value==""||this.r.person.value==""||this.r.time.value==""||this.r.price.value==""||this.r.mobileNo.value==""){
      alert("all parameters are required");
    }
    if(this.bookingForm.invalid){
      return;
    }
    this.http.post(environment.api_url + `/admin/add_booking`,{
      "username": this.r.name.value,
      "email":this.r.email.value,
      "to_city":this.r.to_city.value,
      "from_city":this.r.from_city.value,
      //"booking_date":this.r.booking_date.value,
      "journey_date":this.r.journey_date.value,
      "total_user":this.r.person.value,
      "journey_time":this.r.time.value,
      "price":this.r.price.value,
      "mobileNo":this.r.mobileNo.value
    }).subscribe((data)=>{
      console.log(data);
      if(data['status']=='success'){
        window.location.reload();
      }else{
        alert("all field are required!");
      }
    });
  }
    
  onDestination(eve){
    this.http.post(environment.api_url + `/admin/get_price`,{
     
      "from_city":this.r.from_city.value,
      "to_city":this.r.to_city.value,
      
    }).subscribe(data=>{
      console.log(data);
      this.price=data['data']['price'];
       console.log(this.price);
        this.bookingForm.patchValue({
          'price':this.price
        });
    })
    this.bookingForm.get('person').valueChanges.subscribe(num => {  
      this.bookingForm.patchValue({
        'price':this.countPrice(num)
      });
    });
  }
  //this.bookingForm.get('person').valueChanges.subscribe(num => this.countPrice(num));
  countPrice(totalPeople: number): number {
    //console.log(this.price * totalPeople);
    return this.price * totalPeople;
  } 

}

