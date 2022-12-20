import { TestBed } from '@angular/core/testing'

import { FakeService } from './fake.service'
import { of, throwError } from 'rxjs'
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http'

describe('FakeService', () => {
  let service: FakeService
  let httpClientMock: any

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(FakeService);
    httpClientMock = {
      get: jest.fn(),
      post: jest.fn(),
    }
    service = new FakeService(httpClientMock)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get Observable from getDataV1', () => {
    const responseText = 'Mock Response'
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(responseText))

    service.getDataV1()

    expect(httpClientMock.get).toBeCalledTimes(1)
    expect(httpClientMock.get).toHaveBeenCalledWith(url)
  })

  it('should get Observable from getDataV2', (done) => {
    const responseText = 'Mock Response'
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(responseText))

    service.getDataV2().subscribe(
      (data) => {
        expect(data).toEqual(responseText)
        done()
      },
      (err) => console.log(err)
    )

    expect(httpClientMock.get).toBeCalledTimes(1)
    expect(httpClientMock.get).toHaveBeenCalledWith(url)
  })

  it('should get Observable from getDataV2 but throws error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'not found',
    })
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    jest
      .spyOn(httpClientMock, 'get')
      .mockReturnValue(throwError(() => errorResponse))

    service.getDataV2().subscribe(
      (data) => {
        console.log(data)
        done()
      },
      (error) => {
        expect(error.message()).toContain(errorResponse.error)
        done()
      }
    )

    expect(httpClientMock.get).toBeCalledTimes(1)
    expect(httpClientMock.get).toHaveBeenCalledWith(url)
  })

  it('should get Observable from getDataV2', (done) => {
    const responseText = 'Mock Response'
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(responseText))

    service.getDataV2().subscribe(
      (data) => {
        expect(data).toEqual(responseText)
        done()
      },
      (err) => console.log(err)
    )

    expect(httpClientMock.get).toBeCalledTimes(1)
    expect(httpClientMock.get).toHaveBeenCalledWith(url)
  })

  it('should test postDataV1', () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const testData = 'testing'
    const expectedResponse = 'Massi'
    jest.spyOn(httpClientMock, 'post').mockReturnValue(of(expectedResponse))

    service.postDataV1(testData)
    expect(httpClientMock.post).toHaveBeenCalledWith(
      testData,
      url,
      expect.anything()
    )
  })
})
