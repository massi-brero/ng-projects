import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailMsgComponent } from './fail-msg.component';

describe('FailMsgComponent', () => {
  let component: FailMsgComponent;
  let fixture: ComponentFixture<FailMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
