import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { SeatsSelectionComponent } from './seats-selection/seats-selection.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './authguard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '',component:NavbarComponent},
  { path: 'signup',component:SignupFormComponent},
  { path: 'login',component:LoginComponent},
  {path:  'forgotpassword',component:ForgotPasswordComponent},
  { path: 'movies', component: MoviesListComponent ,canActivate: [AuthguardService]},
  { path: 'movie/:id', component: MovieDetailComponent ,canActivate: [AuthguardService]},
  { path: 'book-tickets', component: BookTicketsComponent ,canActivate: [AuthguardService]},
  { path: 'seats-selection/:movieTitle/:theaterName/:theaterLocation/:timing/:selectedDate', component: SeatsSelectionComponent,canActivate: [AuthguardService] }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
