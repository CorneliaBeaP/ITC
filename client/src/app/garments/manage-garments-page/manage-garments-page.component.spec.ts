import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGarmentsPageComponent } from './manage-garments-page.component';

describe('ManageGarmentsPageComponent', () => {
  let component: ManageGarmentsPageComponent;
  let fixture: ComponentFixture<ManageGarmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGarmentsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGarmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
