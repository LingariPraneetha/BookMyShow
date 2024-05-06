// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   hide: boolean = true;


//   constructor(private http: HttpClient, private router: Router) {}
//   togglePasswordVisibility() {
//     this.hide = !this.hide;
//   }

//   loginUser(): void {
   
//     this.http.post('http://localhost:3000/api/login', { email: this.email, password: this.password })
//       .subscribe((response: any) => {
      
//         localStorage.setItem('authToken', response.token);

//         this.router.navigate(['/movies']);
//       }, error => {
//         console.error('Login error:', error);
//       });
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  passwordValidator(control: NgModel) {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  
    if (!hasNumber && !hasSpecialCharacter) {
      return { invalidPassword: 'Password must contain at least one number and one special character.' };
    } else if (!hasNumber) {
      return { invalidPassword: 'Password must contain at least one number.' };
    } else if (!hasSpecialCharacter) {
      return { invalidPassword: 'Password must contain at least one special character.' };
    }
  
    return null;
  }

  loginUser(): void {
    this.http.post('http://localhost:3000/api/login', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          localStorage.setItem('authToken', response.token);
          
          this.router.navigate(['/movies']);
        },
        (error) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            alert('Invalid email or password');
          }
        }
      );
  }
  ForgotPassword(){
    this.router.navigate(['/forgotpassword'])
  }
}
