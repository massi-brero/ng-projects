import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  countEventTriggered = new EventEmitter<string>();
  count = 0;

  constructor() {
      this.countEventTriggered.subscribe((message: string) => {
      this.increment();
    });
  }

  increment(): void {
    this.count = this.count + 1;
  }
}
