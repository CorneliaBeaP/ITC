import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGarmentPageComponent } from './edit-garment-page.component';

describe('EditGarmentPageComponent', () => {
  let component: EditGarmentPageComponent;
  let fixture: ComponentFixture<EditGarmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGarmentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGarmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
