import {EventEmitter, Injectable, Injector, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class TimerNativeService {
    private countdownTimerRef: any = null;
    private init = 0;
    public paused = true;
    private countdownEndsSource = new Subject<void>();
    public countdownEnds$ = this.countdownEndsSource.asObservable();

    private countdownSource = new BehaviorSubject<number>(this.init);
    public countdown$ = this.countdownSource.asObservable();

    constructor() {
    }

    destroy(): void {
        this.clearTimeout();
    }

    restartCountdown(init?) {
        if (init) {
            this.init = init;
        }

        if (this.init && this.init > 0) {
            this.paused = true;
            this.clearTimeout();
            this.countdownSource.next(this.init);
        }
    }

    toggleCountdown() {
        this.paused = !this.paused;
        if (!this.paused) {
            this.doCountdown();
        } else {
            this.clearTimeout();
        }
    }

    private doCountdown() {
        this.countdownTimerRef = setTimeout(() => {
            this.countdownSource.next(this.countdownSource.getValue() -1);
            this.processCountdown();
        }, 1000);
    }

    private processCountdown() {
        if (this.countdownSource.getValue() <= 0) {
            this.countdownEndsSource.next();
        } else {
            this.doCountdown();
        }
    }

    private clearTimeout() {
        if (this.countdownTimerRef) {
            clearTimeout(this.countdownTimerRef);
            this.countdownTimerRef = null;
        }
    }
}

