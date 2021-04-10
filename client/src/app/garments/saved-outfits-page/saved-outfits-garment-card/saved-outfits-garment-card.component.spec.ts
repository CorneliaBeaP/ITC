import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOutfitsGarmentCardComponent } from './saved-outfits-garment-card.component';

describe('SavedOutfitsGarmentCardComponent', () => {
  let component: SavedOutfitsGarmentCardComponent;
  let fixture: ComponentFixture<SavedOutfitsGarmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedOutfitsGarmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedOutfitsGarmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
