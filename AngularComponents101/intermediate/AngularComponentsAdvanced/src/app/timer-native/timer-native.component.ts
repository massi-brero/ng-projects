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
import {TimerNativeService} from './timer-native.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-timer-native',
    templateUrl: './timer-native.component.html',
    styleUrls: ['./timer-native.component.scss'],
    providers: [TimerNativeService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom
})
export class TimerNativeComponent implements OnInit, OnDestroy {
    @Output() onComplete = new EventEmitter<void>();
    @Input() init = 20;

    private countdownEndsSubscription: Subscription = null;
    private countdownSubscription: Subscription = null;
    public countdown = 0;

    constructor(
        public timer: TimerNativeService,
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
