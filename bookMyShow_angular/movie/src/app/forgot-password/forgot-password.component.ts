import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email:string ='';
  hideNew:boolean =true;
  hideConfirm:boolean=true;
  newPassword:string='';
  confirmPassword:string='';
  emailNotFoundAlertShown:boolean =false;
  submitted: boolean = false; 
  // passwordsMatch: boolean = false;

  constructor(private router:Router,private passwordService:PasswordService){}

  toggleNewPasswordVisibility() {
    this.hideNew = !this.hideNew;
  }
  toggleConfirmPasswordVisibility(){
    this.hideConfirm = !this.hideConfirm;
  }
 

// checkPasswordMatch(): void {
//   this.passwordsMatch = this.newPassword === this.confirmPassword;
// }

  submit() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
      if (this.submitted) {
      return;
    }
    this.submitted = true;
  
    this.passwordService.updateUser(this.email, this.newPassword, this.confirmPassword).subscribe(
      response => {
        console.log(response);
        if (response.status) {
          alert("Password Updated Successfully")
          this.router.navigate(['/login']);
        } else if (response.message === "Email not found" && !this.emailNotFoundAlertShown) {
          alert("Email not found.");
          this.emailNotFoundAlertShown = true; 
        }
      },
      error => {
        console.error(error);
        if (!this.emailNotFoundAlertShown) {
          alert("Email not found.");
          this.emailNotFoundAlertShown = true;
        }
      }
    );
  }
  
  }
