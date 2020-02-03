import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserEventsComponent } from './browser-events.component';

describe('BrowserEventsComponent', () => {
  let component: BrowserEventsComponent;
  let fixture: ComponentFixture<BrowserEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
