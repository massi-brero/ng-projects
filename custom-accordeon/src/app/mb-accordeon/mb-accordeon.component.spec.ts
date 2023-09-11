import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbAccordeonComponent } from './mb-accordeon.component';

describe('MbAccordeonComponent', () => {
  let component: MbAccordeonComponent;
  let fixture: ComponentFixture<MbAccordeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbAccordeonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbAccordeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
