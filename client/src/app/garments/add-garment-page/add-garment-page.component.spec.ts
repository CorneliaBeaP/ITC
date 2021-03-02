import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGarmentPageComponent } from './add-garment-page.component';

describe('AddGarmentPageComponent', () => {
  let component: AddGarmentPageComponent;
  let fixture: ComponentFixture<AddGarmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGarmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGarmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
