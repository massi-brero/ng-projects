import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() init: number  = null;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  private countdownTimerRef: any = null;
  public counter = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('init values updated to: ', changes.init.currentValue);
    this.startCountdown();
  }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  private doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = --this.counter;
      this.processCount();
    }, 1000);
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  private processCount() {
    this.onDecrease.emit(this.counter);
    console.log('count: ', this.counter);

    if (this.counter === 0) {
      this.onComplete.emit();
      console.log('-- counter end --');
    } else {
      this.doCountdown();
    }
  }
}
