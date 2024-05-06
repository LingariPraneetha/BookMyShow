import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsSelectionComponent } from './seats-selection.component';

describe('SeatsSelectionComponent', () => {
  let component: SeatsSelectionComponent;
  let fixture: ComponentFixture<SeatsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
