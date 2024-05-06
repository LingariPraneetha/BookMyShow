import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import {Router} from '@angular/router';
  
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit{

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MovieService],
  })
 
    movies: any[] = [];
    constructor(private movieService: MovieService,private router: Router,) {}
  
    ngOnInit(): void {
      this.movieService.getMovies().subscribe((res:any)=>{
       console.log(this.movies=res);
      
      })
          
    }
    navigateToMovieDetails(movieId: number): void {
      this.router.navigate(['/movie', movieId]);
    }
    
  }

