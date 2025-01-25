import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  #loadingFlag = signal(false)
  loading = this.#loadingFlag.asReadonly()

  loadingOn() {
    this.#loadingFlag.set(true)
  }

  loadingOff() {
    this.#loadingFlag.set(false)
  }
}
