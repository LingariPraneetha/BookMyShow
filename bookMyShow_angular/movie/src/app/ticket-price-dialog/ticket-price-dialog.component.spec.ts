import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPriceDialogComponent } from './ticket-price-dialog.component';

describe('TicketPriceDialogComponent', () => {
  let component: TicketPriceDialogComponent;
  let fixture: ComponentFixture<TicketPriceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPriceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
