import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTagsComponent } from './attribute-tags.component';

describe('AttributeTagsComponent', () => {
  let component: AttributeTagsComponent;
  let fixture: ComponentFixture<AttributeTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
