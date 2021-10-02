import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {TimerService} from './timer/timer.service';
import {SimpleAlertViewComponent} from './simple-alert-view/simple-alert-view.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [TimerService]
})
export class AppComponent implements AfterContentInit, AfterViewInit {

    public isAddTimerVisible = false;
    // public isEndTimerVisible = false;
    public time = 0;
    public timers: Array<number> = [];
    @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;

    constructor(
        private timer: TimerService,
        private cdRef: ChangeDetectorRef
    ) {
        this.timers = [3, 20, 100];
    }

    ngAfterViewInit(): void {
        this.alerts.forEach(alert => {
            if (!alert.title) {
                alert.title = "Huhuhu";
                alert.message = "Hi na?";
            }
            this.cdRef.detectChanges();
        });
    }

    ngAfterContentInit() {
        // this.alert.show();
        // this.alert.title = "Huhuhu";
        // this.alert.message = "Hi na?";
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
        // this.isEndTimerVisible = true;
        this.alerts.first.show();
    }

    // hideEndTimerAlert() {
    //     this.isEndTimerVisible = false;
    // }
}
