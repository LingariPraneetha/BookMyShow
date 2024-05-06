import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  
  getMovies()
  {
    return this.http.get("http://localhost:3000/movies");
  }
  getMovieById(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movies/${movieId}`);
  }


 }