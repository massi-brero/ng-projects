import {Component} from '@angular/core';
import {TimerService} from './timer/timer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [TimerService]
})
export class AppComponent {

    constructor(
        private timer: TimerService
    ) {
    }

    logCountdownEnd() {
        console.log('app component: the countdown has finished');
        this.timer.restartCountdown();
    }
}
