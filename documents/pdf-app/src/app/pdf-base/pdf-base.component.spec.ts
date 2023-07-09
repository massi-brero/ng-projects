import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfBaseComponent } from './pdf-base.component';

describe('PdfBaseComponent', () => {
  let component: PdfBaseComponent;
  let fixture: ComponentFixture<PdfBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
