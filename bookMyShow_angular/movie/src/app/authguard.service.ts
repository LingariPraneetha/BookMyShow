import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService  {

  constructor(private router: Router,private http:HttpClient) {}
  private apiUrl ='http://localhost:3000'
  canActivate(): boolean {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // getUserEmailFromStorage(): Observable<string | null> {
  //   const userEmail = localStorage.getItem('authToken');
  //   return of(userEmail);
  // }


  getUserEmailFromStorage(): Observable<string | null> {
    const token = localStorage.getItem('authToken');
    return of(token);
  }

  current(options:{headers:HttpHeaders}):Observable<any>{
    return this.http.get(`${this.apiUrl}/api/currentuser`,options)
  }

  

}
