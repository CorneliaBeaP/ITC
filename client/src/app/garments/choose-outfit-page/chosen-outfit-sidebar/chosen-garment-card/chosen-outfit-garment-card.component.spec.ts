import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenOutfitGarmentCardComponent } from './chosen-outfit-garment-card.component';

describe('ChosenGarmentCardComponent', () => {
  let component: ChosenOutfitGarmentCardComponent;
  let fixture: ComponentFixture<ChosenOutfitGarmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenOutfitGarmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenOutfitGarmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
