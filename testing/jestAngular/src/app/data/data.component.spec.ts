import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DataComponent } from './data.component'
import { FakeService } from '../services/fake.service'
import { of } from 'rxjs'

describe('DataComponent', () => {
  let component: DataComponent
  let fixture: ComponentFixture<DataComponent>
  let fakeServiceMock: any

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
})
