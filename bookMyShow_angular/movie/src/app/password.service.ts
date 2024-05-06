// password.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl ='http://localhost:3000';

  constructor(private http: HttpClient) { }

  updateUser(email: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/update`, { email, newPassword, confirmPassword });
  }
}
