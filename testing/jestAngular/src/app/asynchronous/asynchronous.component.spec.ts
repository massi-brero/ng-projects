import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AsynchronousComponent } from './asynchronous.component'

describe('AsynchronousComponent', () => {
  let component: AsynchronousComponent
  let fixture: ComponentFixture<AsynchronousComponent>

  beforeEach(async () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    await TestBed.configureTestingModule({
      declarations: [AsynchronousComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AsynchronousComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set setTimeoutCheck', () => {
    component.checkSetTimeout()
    const expected = 'setTimeoutCheck'

    //asynchronous call!!
    expect(component.timeoutResponse).not.toBe(expected)

    //jest.advanceTimersByTime(1000)
    jest.runAllTimers()
    expect(component.timeoutResponse).toBe(expected)
    expect(setTimeout).toHaveBeenCalledTimes(1)
  })
})
