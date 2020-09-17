import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {
  
  city: any;
  submitted = false; 
  ticketForm:FormGroup;
  route: any[];
  price: any;

  constructor(private http: HttpClient,
    private router: Router,
    private fromBuilder: FormBuilder) { }


    ngOnInit() {
      this.ticketForm = this.fromBuilder.group({
        route_name: ['',[Validators.required]],
        from_city: ['',[Validators.required]],
        to_city: ['',[Validators.required]],
        price: ['',[Validators.required]],
      });
  
      this.http.get(environment.api_url + `/admin/get_only_city/`
      ).subscribe((data:any[])=> {
        console.log(data);
        this.city = data['data']; 
      });
  
      this.http.get(environment.api_url + `/admin/get_all_routes/`
      ).subscribe((data:any[])=> {
        console.log(data);
        this.route = data['data']; 
      });
    }
  
    get r(){
      return this.ticketForm.controls;
    }
  
    onSubmit(){
      this.submitted=true;
      if(this.r.route_name.value==""||this.r.from_city.value==""||this.r.to_city.value==""||this.r.price.value==""){
        alert("all parameters are required");
    }
    if(this.ticketForm.invalid){
      return;
    }
        this.http.post(environment.api_url + `/admin/add_ticketPrice`,{
          "route_name": this.r.route_name.value,
          "from_city":this.r.from_city.value,
          "to_city":this.r.to_city.value,
          "price":this.r.price.value,
          
        }).subscribe((data)=>{
          console.log(data);
          if(data['status']=='success'){
           this.router.navigate(['/ticket-price']);
          }else{
            alert("all field are required!");
          }
        });
    }

    

}
