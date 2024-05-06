import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showLoginButton: boolean = false
  constructor(private router:Router){}
register(){
  this.router.navigate(['/signup']);
}
login(){
  this.router.navigate(['/login']);
}
shouldShowWelcomeMessage(): boolean {
  return !this.router.url.includes('login') && !this.router.url.includes('signup');
}

shouldShowLoginButton(): boolean {
;  return !this.router.url.includes('login') && !this.router.url.includes('signup');
}
BookMyShow(){
  this.router.navigate(['/']);
}
}
