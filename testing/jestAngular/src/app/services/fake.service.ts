import { Injectable } from '@angular/core'
import { catchError, Observable, of, tap } from 'rxjs'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FakeService {
  constructor(private http: HttpClient) {}

  getDataV1(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    return this.http.get(url)
  }

  getDataV2(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    return this.http.get(url).pipe(
      tap((data: any) => console.log(data)),
      catchError((err) => this.handleError(err))
    )
  }

  postDataV1(data: any): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }
    return this.http.post(data, url, httpOptions)
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    const msg = `server returned ${error.status} with body ${error.error}`
    return of(`operation failed: ${msg}`)
  }
}
