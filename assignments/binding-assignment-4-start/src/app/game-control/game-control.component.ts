import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() heartbeatPing = new EventEmitter<{ count: number }>();

  private count = 0;
  private intervalHandle: number;


  constructor() {
  }

  ngOnInit() {
  }

  public onStartCounter() {
    this.intervalHandle = setInterval(
      () => {
        this.heartbeatPing.emit({count: this.count});
        this.count++;
      },
      1000);
  }

  public onStopCounter() {
    clearInterval(this.intervalHandle);
  }

}
