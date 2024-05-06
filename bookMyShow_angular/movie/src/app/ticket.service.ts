import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
   private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  bookSeats(ticketDetails: any): Observable<any> {
   console.log(this.http.post<any>(`${this.apiUrl}/api/ticketDetails`,ticketDetails));
    return this.http.post<any>(`${this.apiUrl}/api/ticketDetails`,ticketDetails)
  }


  getBookedSeats(movieTitle: string, theaterName: string, date: string, timing: string): Observable<any> {
    const url = `${this.apiUrl}/api/booked-seats?movieTitle=${movieTitle}&theaterName=${theaterName}&date=${date}&timing=${timing}`;
    return this.http.get<any>(url);
  }

  getUserTickets(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/userTickets`);
  }
}
