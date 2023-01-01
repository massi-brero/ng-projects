import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataComponent } from './data.component'
import { FakeService } from '../services/fake.service'
import { of, throwError } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'

describe('DataComponent', () => {
  let component: DataComponent
  let fixture: ComponentFixture<DataComponent>
  let fakeServiceMock: any
  const response1 = 'Good Morning'
  const response2 = 'Good Day'
  const response3 = 'Good Evening'
  const expectedGreetingsResponse = [
    [{ name: '', time: 0 }, response1],
    [{ name: '', time: 9 }, response1],
    [{ name: '', time: 10 }, response2],
    [{ name: '', time: 11 }, response2],
    [{ name: '', time: 20 }, response3],
  ]

  beforeEach(async () => {
    fakeServiceMock = {
      getDataV1: jest.fn(),
    }
    await TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers: [
        {
          provide: FakeService,
          useValue: fakeServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DataComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should return service data', () => {
    const expectedResponse = { name: 'Massi' }
    jest
      .spyOn(fakeServiceMock, 'getDataV1')
      .mockReturnValue(of(expectedResponse))
    fixture.detectChanges()

    expect(component.serviceData.name).toBe(expectedResponse.name)
  })

  it('should return service data', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not found',
    })

    jest
      .spyOn(fakeServiceMock, 'getDataV1')
      .mockReturnValue(throwError(() => errorResponse))

    component.getServiceData()

    expect(component.errorMessage).toBe(errorResponse.statusText)
  })

  it.each(expectedGreetingsResponse)(
    'greetings: given %p returns %p',
    (res, expected) => {
      jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(res))
      fixture.detectChanges()

      expect(component.greeting).toBe(expected)
    }
  )
})
