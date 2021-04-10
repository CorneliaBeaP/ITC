import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOutfitCardComponent } from './saved-outfit-card.component';

describe('SavedOutfitsGarmentCardComponent', () => {
  let component: SavedOutfitCardComponent;
  let fixture: ComponentFixture<SavedOutfitCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedOutfitCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedOutfitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
