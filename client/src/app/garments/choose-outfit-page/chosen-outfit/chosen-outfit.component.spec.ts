import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenOutfitComponent } from './chosen-outfit.component';

describe('ChosenOutfitComponent', () => {
  let component: ChosenOutfitComponent;
  let fixture: ComponentFixture<ChosenOutfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenOutfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
