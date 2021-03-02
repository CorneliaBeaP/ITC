import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttributesPageComponent } from './add-attributes-page.component';

describe('AddAtributesPageComponent', () => {
  let component: AddAttributesPageComponent;
  let fixture: ComponentFixture<AddAttributesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttributesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttributesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
