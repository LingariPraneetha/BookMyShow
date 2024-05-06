import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService,private router:Router) {}

  ngOnInit(): void {
    console.log("moviedetailcomponent initialized")
    this.route.params.subscribe((params) => {
      const movieId = +params['id'];
      this.loadMovieDetails(movieId);
    });
  }

  private loadMovieDetails(movieId: number): void {
    this.movieService.getMovieById(movieId).subscribe(
      (data) => {
        this.movie = data;
        console.log('Fetched Movie Details:', this.movie); 
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }


  navigateToBookTickets(): void {
    this.router.navigate(['/book-tickets',{movieTitle:this.movie.title}]);
  }
  
}