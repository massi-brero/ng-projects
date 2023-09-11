import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordeonItemComponent } from './accordeon-item.component';

describe('AccordeonItemComponent', () => {
  let component: AccordeonItemComponent;
  let fixture: ComponentFixture<AccordeonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordeonItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordeonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
