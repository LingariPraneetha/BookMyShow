// import { Component,OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MovieService } from '../movie.service';
// import { MatDialog } from '@angular/material/dialog'; 
// import { TheaterService } from '../theater.service';
// import { Router } from '@angular/router';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-book-tickets',
//   templateUrl: './book-tickets.component.html',
//   styleUrls: ['./book-tickets.component.css']
// })
// export class BookTicketsComponent {
//   theaters: any[] = [];
//   movieTitle:string='';
//   minDate = new Date();
//   selectedDate: Date = new Date();
//   date=this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')

//   constructor(private route:ActivatedRoute,private movieService:MovieService,public dialog: MatDialog,private theaterService:TheaterService, private router:Router,private datePipe: DatePipe,) {}

//   ngOnInit(): void {

//     this.route.params.subscribe((params)=>{
//       this.movieTitle=params['movieTitle'];
//       this.loadTheatresForMovie(this.movieTitle)
//     });
//   }
//   hoveredTheater: any | null = null;
//   hoveredTiming: string | null = null;

//   setHoveredDetails(theater: any, timing: string): void {
//     this.hoveredTheater = theater;
//     this.hoveredTiming = timing;
//   }

//   clearHoveredDetails(): void {
//     this.hoveredTheater = null;
//     this.hoveredTiming = null;
//   }
//   private loadTheatresForMovie(movieTitle:string):void{
//     this.theaterService.getTheatersForMovie(movieTitle).subscribe(
//       (data) => {
//         this.theaters = data;
//       },
//       (error) => {
//         console.error('Error fetching theaters:', error);
//       }
//     );
//   }
//   getTicketPrice(theater: any, index: number): string {
//     const ticketPrices = theater.ticketPrices.split(',');
//     return ticketPrices[index];
//   }
 
//   bookTickets(theater: any, timing: string): void {
   
//     this.router.navigate([
//       'seats-selection',
//       this.movieTitle,
//       theater.name,
//       theater.location,
//       timing,
//       this.selectedDate.toString()
//     ]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { MatDialog } from '@angular/material/dialog'; 
import { TheaterService } from '../theater.service';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {
  theaters: any[] = [];
  movieTitle:string='';
  minDate = new Date();
  selectedDate: Date = new Date();
  date=this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')

  constructor(private route:ActivatedRoute,private movieService:MovieService,public dialog: MatDialog,private theaterService:TheaterService, private router:Router,private datePipe: DatePipe,) {}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.movieTitle=params['movieTitle'];
      this.loadTheatresForMovie(this.movieTitle);
    });
    const storedDate = localStorage.getItem('selectedDate');

    if (storedDate) {
      this.selectedDate = new Date(storedDate);
    } else {
      this.selectedDate = new Date();
    }
  }

  
  onDateSelect(date: Date) {
    localStorage.setItem('selectedDate', date.toISOString());
  }
  hoveredTheater: any | null = null;
  hoveredTiming: string | null = null;

  setHoveredDetails(theater: any, timing: string): void {
    this.hoveredTheater = theater;
    this.hoveredTiming = timing;
  }

  clearHoveredDetails(): void {
    this.hoveredTheater = null;
    this.hoveredTiming = null;
  }

  private loadTheatresForMovie(movieTitle: string): void {
    this.theaterService.getTheatersForMovie(movieTitle).subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          this.theaters = data.map(theater => {
            const timings = theater.showTimings.split(','); 
            const filteredTimings = timings.filter((timing: string) => {
              const [time, period] = timing.trim().split(' ');
              const [hourStr, minuteStr] = time.split(':');
              let hour = parseInt(hourStr, 10);
              const minute = parseInt(minuteStr, 10);
  
              if (period === 'PM' && hour !== 12) {
                hour += 12;
              } else if (period === 'AM' && hour === 12) {
                hour = 0;
              }  
              return this.isFutureTime(hour, minute);
            }); 
            return { ...theater, timings: filteredTimings };
          });
        } else {
          console.error('Data is not in the expected format:', data);
        }
      },
      (error) => {
        console.error('Error fetching theaters:', error);
      }
    );
  }
  
  private isFutureTime(hour: number, minute: number): boolean {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    return hour > currentHour || (hour === currentHour && minute >= currentMinute);
  }

  isFutureTimeForTiming(timing: string): boolean {
    const selectedDate = new Date(this.selectedDate);
    const currentDate = new Date();
    const [time, period] = timing.trim().split(' ');
    const [hourStr, minuteStr] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
  
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
  
    if (selectedDate.toDateString() === currentDate.toDateString()) {
      return this.isFutureTime(hour, minute);
    } 
    return true;
  }
  getTicketPrice(theater: any, index: number): string {
    const ticketPrices = theater.ticketPrices.split(',');
    return ticketPrices[index];
  }
 
  bookTickets(theater: any, timing: string): void {
    this.router.navigate([
      'seats-selection',
      this.movieTitle,
      theater.name,
      theater.location,
      timing,
      this.selectedDate.toString()
    ]);
   
  }
}
