import {Component} from '@angular/core';
import {TimerService} from './timer/timer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [TimerService]
})
export class AppComponent {

    public isAddTimerVisible = false;
    public isEndTimerVisible = false;
    public time = 0;
    public timers: Array<number> = [];

    constructor(
        private timer: TimerService
    ) {
        this.timers = [3, 20, 100];
    }

    logCountdownEnd() {
        console.log('app component: the countdown has finished');
        this.timer.restartCountdown();
    }

    showAddTimer() {
        this.isAddTimerVisible = true;
    }

    hideAddTimer() {
        this.isAddTimerVisible = false;
    }

    submitAddTimer() {
        this.timers.push(this.time);
        this.hideAddTimer();
    }

    showEndTimerAlert() {
        this.isEndTimerVisible = true;
    }

    hideEndTimerAlert() {
        this.isEndTimerVisible = false;
    }
}
