
  import { Component,ChangeDetectorRef } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { MatDialog } from '@angular/material/dialog';
  import { TicketPriceDialogComponent } from '../ticket-price-dialog/ticket-price-dialog.component';
  import { TicketService } from '../ticket.service';
  import { DatePipe } from '@angular/common';

  @Component({
    selector: 'app-seats-selection',
    templateUrl: './seats-selection.component.html',
    styleUrls: ['./seats-selection.component.css']
  })
  export class SeatsSelectionComponent {
    movieTitle: string = '';
    theaterName: string = '';
    theaterLocation: string = '';
    timing: string = '';
    selectedDate: Date = new Date();
    selectedSeatCount: number = 1;
    seatCounts: number[] = [1, 2, 3, 4, 5, 6];
    bookedSeats:[] = [];
    formattedDate: any='';
    previouslyBookedSeats: string[] = [];
    selectedSeats :string[]=[];
    bookedDetails:string[]=[];
    isSelected:boolean=false;
    
    constructor(
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private ticketService: TicketService,
      private datePipe: DatePipe,
    ) {}

    ngOnInit(): void  {
   
      this.route.params.subscribe((params) => {
        this.movieTitle = params['movieTitle'];
        this.theaterName = params['theaterName'];
        this.theaterLocation = params['theaterLocation'];
        this.timing = params['timing'];
        this.selectedSeats = [];
        this.selectedDate=params['selectedDate'];
        this.formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
        console.log(typeof(this.formattedDate));   
      });
      this.fetchBookedSeats();
    }

    fetchBookedSeats(): void {
      const formattedDate = this.formattedDate;
      const formattedTime = this.timing;
    
      this.ticketService.getBookedSeats(this.movieTitle, this.theaterName, formattedDate, formattedTime).subscribe(
        (bookedSeats: string[]) => {
          this.previouslyBookedSeats = bookedSeats;
          console.log("previouslyBookedSeats", this.previouslyBookedSeats);
          localStorage.setItem('bookedSeats', JSON.stringify(this.previouslyBookedSeats));
          
          this.updateBookedDetails();
        },
        (error) => {
          console.error('Error retrieving booked seats:', error);
        }
      );
    }
    
    updateBookedDetails(): void {
      const bookingSeating = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
      console.log(bookingSeating);
    
      bookingSeating.forEach((booking: any) => {
        if (booking && booking.movieTitle && booking.theaterName && booking.seats && booking.date && booking.timing) {
          if (booking.movieTitle === this.movieTitle && booking.theaterName === this.theaterName && booking.date === this.formattedDate && booking.timing === this.timing) {
            const bookedSeatsArray = JSON.parse(booking.seats);
            console.log('bookedSeatsArray', bookedSeatsArray);
            this.bookedDetails = this.bookedDetails.concat(bookedSeatsArray);
            console.log('booked details', this.bookedDetails);
          }
        }
      });
    }
    

    onSeatClick(seatId: string): void {
      const seatIndex = this.selectedSeats.indexOf(seatId); 
      
      if (seatIndex === -1 && this.selectedSeats.length >= 6) {
        alert("Maximum of 6 seats can be selected");
        return;
      }
      if (seatIndex === -1 && !this.isSeatBooked(seatId)) {
        this.selectedSeats.push(seatId);
        this.isSelected = true;
      } else if (seatIndex !== -1) {
        this.selectedSeats.splice(seatIndex, 1);
        this.isSelected = false;
      }
    
    } 


  async bookSeats(): Promise<void> {
      if (this.selectedSeats.length > 0) {
        this.openTicketPriceDialog();
      }      
    }

    openTicketPriceDialog(): void {
      console.log('Opening Ticket Price Dialog');
      this.selectedSeats.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      const dialogRef = this.dialog.open(TicketPriceDialogComponent, {
        data: {
          movieTitle:this.movieTitle,
          date: this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
          theaterName: this.theaterName,
          theaterLocation: this.theaterLocation,
          timing: this.timing,
          seats: this.selectedSeats,
          totalTicketPrice: this.selectedSeats.length * 290
        },
        width: '500px',
      });

      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.storeTicketDetails();
        }
      });
    }

    async storeTicketDetails(): Promise <void> {
      this.selectedSeats.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      const bookSeating = {
        movieTitle: this.movieTitle,
        date:this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
        theaterName: this.theaterName,
        theaterLocation: this.theaterLocation,
        timing: this.timing,
        seats:  this.selectedSeats,
        totalTicketPrice: this.selectedSeats.length * 290,
      };
      console.log("bookseating",bookSeating)
      localStorage.setItem('data',JSON.stringify(bookSeating));

      try {
      const response = await this.ticketService.bookSeats(bookSeating).toPromise();
        if(response && response.bookSeats) {
          this.bookedDetails = this.bookedDetails.concat(this.selectedSeats);
          this.selectedSeats = [];
          this.timing = '';
          this.formattedDate = '';
          
        } else {
          console.log('Unexpected response format:', response);
        }
      }
      catch (error) {
        console.error('Error booking seats:', error);
      }
    }
  
    isSeatSelected(seatId: string): boolean {
      return this.selectedSeats.includes(seatId);
    }

    isSeatBooked(seatId: string):any {
      return this.bookedDetails.includes(seatId);
    }
  }


  // import { Component } from '@angular/core';
  // import { ActivatedRoute, Router } from '@angular/router';
  // import { MatDialog } from '@angular/material/dialog';
  // import { TicketPriceDialogComponent } from '../ticket-price-dialog/ticket-price-dialog.component';
  // import { TicketService } from '../ticket.service';
  // import { DatePipe } from '@angular/common';

  // @Component({
  //   selector: 'app-seats-selection',
  //   templateUrl: './seats-selection.component.html',
  //   styleUrls: ['./seats-selection.component.css']
  // })
  // export class SeatsSelectionComponent {
  //   movieTitle: string = '';
  //   theaterName: string = '';
  //   theaterLocation: string = '';
  //   timing: string = '';
  //   selectedDate: Date = new Date();
  //   selectedSeatCount: number = 1;
  //   seatCounts: number[] = [1, 2, 3, 4, 5, 6];
  //   bookedSeats:[] = [];
  //   formattedDate: any='';
  //   previouslyBookedSeats: string[] = [];
  //   selectedSeats :string[]=[];
  //   bookedDetails:string[]=[];
  //   isSelected:boolean=false;
    
  //   constructor(
  //     private route: ActivatedRoute,
  //     private dialog: MatDialog,
  //     private ticketService: TicketService,
  //     private datePipe: DatePipe,
  //   ) {}

  //   ngOnInit(): void  {
   
  //     this.route.params.subscribe((params) => {
  //       this.movieTitle = params['movieTitle'];
  //       this.theaterName = params['theaterName'];
  //       this.theaterLocation = params['theaterLocation'];
  //       this.timing = params['timing'];
  //       this.selectedSeats = [];
  //       this.selectedDate=params['selectedDate'];
  //       this.formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
  //       console.log(typeof(this.formattedDate));   
  //     });
  //     this.fetchBookedSeats();
  //   }

  //   fetchBookedSeats(): void {
  //     const formattedDate = this.formattedDate;
  //     const formattedTime = this.timing;
    
  //     this.ticketService.getBookedSeats(this.movieTitle, this.theaterName, formattedDate, formattedTime).subscribe(
  //       (bookedSeats: string[]) => {
  //         this.previouslyBookedSeats = bookedSeats;
  //         console.log("previouslyBookedSeats", this.previouslyBookedSeats);
  //         localStorage.setItem('bookedSeats', JSON.stringify(this.previouslyBookedSeats));
          
  //         this.updateBookedDetails();
  //       },
  //       (error) => {
  //         console.error('Error retrieving booked seats:', error);
  //       }
  //     );
  //   }
    
  //   updateBookedDetails(): void {
  //     const bookingSeating = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
  //     console.log(bookingSeating);
    
  //     bookingSeating.forEach((booking: any) => {
  //       if (booking && booking.movieTitle && booking.theaterName && booking.seats && booking.date && booking.timing) {
  //         if (booking.movieTitle === this.movieTitle && booking.theaterName === this.theaterName && booking.date === this.formattedDate && booking.timing === this.timing) {
  //           const bookedSeatsArray = JSON.parse(booking.seats);
  //           console.log('bookedSeatsArray', bookedSeatsArray);
  //           this.bookedDetails = this.bookedDetails.concat(bookedSeatsArray);
  //           console.log('booked details', this.bookedDetails);
  //         }
  //       }
  //     });
  //   }
    

  //   onSeatClick(seatId: string): void {
  //     const seatIndex = this.selectedSeats.indexOf(seatId); 
      
  //     if (seatIndex === -1 && this.selectedSeats.length >= 6) {
  //       alert("Maximum of 6 seats can be selected");
  //       return;
  //     }
  //     if (seatIndex === -1 && !this.isSeatBooked(seatId)) {
  //       this.selectedSeats.push(seatId);
  //       this.isSelected = true;
  //     } else if (seatIndex !== -1) {
  //       this.selectedSeats.splice(seatIndex, 1);
  //       this.isSelected = false;
  //     }
    
  //   } 


  // async bookSeats(): Promise<void> {
  //     if (this.selectedSeats.length > 0) {
  //       this.openTicketPriceDialog();
  //     }      
  //   }

  //   openTicketPriceDialog(): void {
  //     console.log('Opening Ticket Price Dialog');
  //     this.selectedSeats.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  //     const dialogRef = this.dialog.open(TicketPriceDialogComponent, {
  //       data: {
  //         movieTitle:this.movieTitle,
  //         date: this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
  //         theaterName: this.theaterName,
  //         theaterLocation: this.theaterLocation,
  //         timing: this.timing,
  //         seats: this.selectedSeats,
  //         totalTicketPrice: this.selectedSeats.length * 290
  //       },
  //       width: '500px',
  //     });

  //     dialogRef.afterClosed().subscribe((confirmed) => {
  //       if (confirmed) {
  //         this.storeTicketDetails();
  //       }
  //     });
  //   }

  //   async storeTicketDetails(): Promise <void> {
  //     this.selectedSeats.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  //     const bookSeating = {
  //       movieTitle: this.movieTitle,
  //       date:this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
  //       theaterName: this.theaterName,
  //       theaterLocation: this.theaterLocation,
  //       timing: this.timing,
  //       seats:  this.selectedSeats,
  //       totalTicketPrice: this.selectedSeats.length * 290,
  //     };
  //     console.log("bookseating",bookSeating)
  //     localStorage.setItem('data',JSON.stringify(bookSeating));

  //     try {
  //     const response = await this.ticketService.bookSeats(bookSeating).toPromise();
  //       if(response && response.bookSeats) {
  //         this.bookedDetails = this.bookedDetails.concat(this.selectedSeats);
  //         this.selectedSeats = [];
  //         this.timing = '';
  //         this.formattedDate = '';
          
  //       } else {
  //         console.log('Unexpected response format:', response);
  //       }
  //     }
  //     catch (error) {
  //       console.error('Error booking seats:', error);
  //     }
  //   }
  
  //   isSeatSelected(seatId: string): boolean {
  //     return this.selectedSeats.includes(seatId);
  //   }

  //   isSeatBooked(seatId: string):any {
  //     return this.bookedDetails.includes(seatId);
  //   }
  // }


