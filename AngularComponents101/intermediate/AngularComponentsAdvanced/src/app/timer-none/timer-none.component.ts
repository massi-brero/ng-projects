import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {TimerNoneService} from './timer-none.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-timer-none',
    templateUrl: './timer-none.component.html',
    styleUrls: ['./timer-none.component.scss'],
    providers: [TimerNoneService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimerNoneComponent implements OnInit, OnDestroy {
    @Output() onComplete = new EventEmitter<void>();
    @Input() init = 20;

    private countdownEndsSubscription: Subscription = null;
    private countdownSubscription: Subscription = null;
    public countdown = 0;

    constructor(
        public timer: TimerNoneService,
        private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.timer.restartCountdown(this.init);
        this.countdownEndsSubscription = this.timer.countdownEnds$.subscribe(() => {
            console.log('-- countdown ends --');
            this.onComplete.emit();
        });

        this.countdownSubscription = this.timer.countdown$
            .subscribe(data => {
                this.countdown = data;
                this.cdRef.markForCheck();
        });
    }

    ngOnDestroy() {
        this.timer.destroy();
        this.countdownEndsSubscription.unsubscribe();
        this.countdownSubscription.unsubscribe();
    }

    get progress() {
        console.log('get progress');
        return (this.init - this.countdown) / this.init * 100;
    }

}
