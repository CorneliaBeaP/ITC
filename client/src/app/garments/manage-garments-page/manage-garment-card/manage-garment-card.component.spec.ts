import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGarmentCardComponent } from './manage-garment-card.component';

describe('ManageGarmentCardComponent', () => {
  let component: ManageGarmentCardComponent;
  let fixture: ComponentFixture<ManageGarmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGarmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGarmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
