// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthguardService } from '../authguard.service';
// import { HttpHeaders } from '@angular/common/http';
// import { TicketService } from '../ticket.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })


// export class HeaderComponent {
//   constructor(private router:Router,private authService:AuthguardService,private ticketService:TicketService){}
//   currentUser: any; 
//   orders: any[] = [];
//   showOrdersTable = false;
//   ngOnInit(): void {
//     this.YourOrders();
//     const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//     this.authService.current(options).subscribe(
//       (response) => {
//         this.currentUser = response;
//       },
//       (error) => {
//         console.error('Error fetching current user:', error);
//       }
//     );
//   }
//   logout(): void {
 
//     localStorage.removeItem('authToken');
    
//     this.router.navigate(['/login']);
//   }
//   bookMyShowIcon(){
//     this.router.navigate(['/movies']).then(() => {
//       window.location.reload();
//     });
//   }

//   YourOrders(): void {
//     this.ticketService.getUserTickets().subscribe(
//       (response) => {
//         this.orders = response;
//       },
//       (error) => {
//         console.error('Error fetching user orders:', error);
//       }
//     );
//     this.showOrdersTable = !this.showOrdersTable;
//   }
 
// }


import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from '../authguard.service';
import { HttpHeaders } from '@angular/common/http';
import { TicketService } from '../ticket.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthguardService,
    private ticketService: TicketService,
    private renderer:Renderer2
  ) {}
  
  currentUser: any; 
  orders: any[] = [];
  showOrdersTable = true;
  
  ngOnInit(): void {
    this.fetchCurrentUser();
    this.fetchUserTickets();
    this.YourOrders();
      
  }
  // toggleOrdersTable(): void {
  //   this.showOrdersTable = !this.showOrdersTable;
  //   if (this.showOrdersTable) {
  //     this.renderer.setStyle(document.getElementById('offcanvasEnd'), 'width', '50%');
  //   } else {
  //     this.renderer.setStyle(document.getElementById('offcanvasEnd'), 'width', '30%');
  //   }
  
  // }


  // toggleOrdersTable(): void {
  //   this.showOrdersTable = !this.showOrdersTable;
  //   if (this.showOrdersTable) {
  //     if (window.innerWidth <= 768) {
  //       this.renderer.setStyle(document.getElementById('offcanvasEnd'), 'width', '100%');
  //     } else {
  //       this.renderer.setStyle(document.getElementById('offcanvasEnd'), 'width', '50%');
  //     }
  //   } else {
  //     this.renderer.setStyle(document.getElementById('offcanvasEnd'), 'width', '30%');;
  //   }
    
  // }

  toggleOrdersTable(): void {
    this.showOrdersTable = !this.showOrdersTable;
    const offcanvasEnd = document.getElementById('offcanvasEnd');
   
    this.renderer.setStyle(offcanvasEnd, 'width', '100%');


      if (window.innerWidth <= 900) {
        this.renderer.setStyle(offcanvasEnd, 'width', '100%');
      } else {
        this.renderer.setStyle(offcanvasEnd, 'width', '50%');
      }
    
   
  }

  toggleOrdersTable2(): void {
    this.showOrdersTable = !this.showOrdersTable;
    const offcanvasEnd = document.getElementById('offcanvasEnd');
   
    this.renderer.setStyle(offcanvasEnd, 'width', '100%');


      if (window.innerWidth <= 900) {
        this.renderer.setStyle(offcanvasEnd, 'width', '100%');
      } else {
        this.renderer.setStyle(offcanvasEnd, 'width', '30%');
      }
    
   
  }
  
  
  fetchCurrentUser(): void {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.authService.current(options).subscribe(
      (response) => {
        this.currentUser = response;
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  bookMyShowIcon(): void {
    this.router.navigate(['/movies']).then(() => {
      window.location.reload();
    });
  }

  fetchUserTickets(): void {
    this.ticketService.getUserTickets().subscribe(
      (response) => {
        this.orders = response.map((order: any) => {
          const seats = order.seats.replace(/[\[\]"']/g, '');
          return { ...order, seats };
        });
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  } 

  YourOrders(): void {
    this.fetchUserTickets();
    this.showOrdersTable = !this.showOrdersTable;
  }
}
