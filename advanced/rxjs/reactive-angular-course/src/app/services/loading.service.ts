import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { concatMap, finalize, tap } from 'rxjs/operators'

@Injectable()
export class LoadingService {
  private loadingSubj = new BehaviorSubject<boolean>(false)
  loading$ = this.loadingSubj.asObservable()

  constructor() {
    console.log('Loading Service created...')
  }

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    )
  }

  loadingOn(): void {
    this.loadingSubj.next(true)
  }

  loadingOff(): void {
    this.loadingSubj.next(false)
  }
}
