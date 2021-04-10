import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOutfitsPageComponent } from './saved-outfits-page.component';

describe('SavedOutfitsPageComponent', () => {
  let component: SavedOutfitsPageComponent;
  let fixture: ComponentFixture<SavedOutfitsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedOutfitsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedOutfitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
