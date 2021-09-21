import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {TimerService} from './timer.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
    providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {
    @Output() onComplete = new EventEmitter<void>();
    @Input() init = 20;

    private countdownEndsSubscription: Subscription = null;

    constructor(public timer: TimerService) {
    }

    ngOnInit(): void {
        this.timer.restartCountdown(this.init);
        this.countdownEndsSubscription = this.timer.countdownEnds$.subscribe(() => {
            console.log('-- countdown ends --');
        });
    }

    ngOnDestroy() {
        this.timer.destroy();
        this.countdownEndsSubscription.unsubscribe();
    }

}
