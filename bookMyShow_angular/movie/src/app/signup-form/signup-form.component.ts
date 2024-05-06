import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  EmployeeArray:any[]=[];
  isResultLoaded=false;
  name:string="";
  email:string="";
  mobileNumber:string="";
  password:string="";
  currentEmployeeID="";
  hide: boolean = true;

  
constructor(private http:HttpClient,private router:Router){}

username(event: any) {
  let patt = /^([a-zA-Z ])$/
  let result1 = patt.test(event.key);
  return result1;
}
togglePasswordVisibility() {
  this.hide = !this.hide;
}

submitDetails(signupForm: NgForm) {
  if (signupForm.valid) {
    this.register();
  }
}
register()
{
  let bodyData = {
    "name" : this.name,
    "email" : this.email,
    "mobileNumber":this.mobileNumber,
    "password":this.password  
  };
  this.http.post("http://localhost:3000/api/add",bodyData).subscribe(()=>
  {
      
      alert("User Registered Successfully");
     
      this.router.navigate(['/login']);
  });
}

  }

