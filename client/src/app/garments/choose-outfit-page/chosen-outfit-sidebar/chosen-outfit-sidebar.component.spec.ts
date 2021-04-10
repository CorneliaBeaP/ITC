import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenOutfitSidebarComponent } from './chosen-outfit-sidebar.component';

describe('ChosenOutfitComponent', () => {
  let component: ChosenOutfitSidebarComponent;
  let fixture: ComponentFixture<ChosenOutfitSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenOutfitSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenOutfitSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
