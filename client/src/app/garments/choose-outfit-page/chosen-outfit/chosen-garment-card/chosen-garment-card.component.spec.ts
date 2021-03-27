import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenGarmentCardComponent } from './chosen-garment-card.component';

describe('ChosenGarmentCardComponent', () => {
  let component: ChosenGarmentCardComponent;
  let fixture: ComponentFixture<ChosenGarmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenGarmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenGarmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
