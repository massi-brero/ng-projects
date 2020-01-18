import { Component, AfterContentChecked } from '@angular/core';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  counter = 0;

  constructor(private counterService: CounterService) {}

  ngAfterContentChecked() {
    this.counter = this.counterService.count;
  }
}
