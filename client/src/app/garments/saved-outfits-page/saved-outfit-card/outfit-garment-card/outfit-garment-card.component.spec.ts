import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitGarmentCardComponent } from './outfit-garment-card.component';

describe('OutfitGarmentCardComponent', () => {
  let component: OutfitGarmentCardComponent;
  let fixture: ComponentFixture<OutfitGarmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutfitGarmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitGarmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
