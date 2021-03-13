import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseOutfitPageComponent } from './choose-outfit-page.component';

describe('ChooseOutfitPageComponent', () => {
  let component: ChooseOutfitPageComponent;
  let fixture: ComponentFixture<ChooseOutfitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseOutfitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseOutfitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
