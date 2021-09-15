import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit{

  @Input() init: number  = null;
  public counter = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown() {
    if (this.init && this.init > 0) {
       this.counter = this.init;
       this.doCountdown();
    }
  }

  private doCountdown() {
    setTimeout(() => {
      this.counter = --this.counter;
      this.processCount();
    }, 1000);
  }

  private processCount() {
    // emit event Count
    console.log('count: ', this.counter);

    if (this.counter === 0) {
      // emit counter
      console.log('-- counter end --');
    } else {
      this.doCountdown();
    }
  }
}
