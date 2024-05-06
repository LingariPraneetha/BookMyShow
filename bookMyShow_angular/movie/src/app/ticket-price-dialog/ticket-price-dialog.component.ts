
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-price-dialog',
  templateUrl: `./ticket-price-dialog.component.html`,
})
export class TicketPriceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TicketPriceDialogComponent>,private router:Router) {}


  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
   this.router.navigate(['/movies']);
    
  }
}

