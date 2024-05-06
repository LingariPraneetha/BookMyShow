import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { SeatsSelectionComponent } from './seats-selection/seats-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { TicketPriceDialogComponent } from './ticket-price-dialog/ticket-price-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PhoneMaskDirective } from './phone-mask.directive';
import { LoginComponent } from './login/login.component';
import { LoggingInterceptor } from './logging.interceptor';
import { DatePipe } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MovieDetailComponent,
    BookTicketsComponent,
    SeatsSelectionComponent,
    HeaderComponent,
    CarouselComponent,
    TicketPriceDialogComponent,
    SignupFormComponent,
    NavbarComponent,
    PhoneMaskDirective,
    LoginComponent,
    ForgotPasswordComponent,
    OffcanvasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
    
  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true
 },
DatePipe ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
