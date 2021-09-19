import {EventEmitter, Injectable, Injector, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class TimerService {
    private countdownTimerRef: any = null;
    private init = 0;
    public countdown = 0;
    public paused = true;

    private countdownEndsSource = new Subject<void>();
    public countdownEnds$ = this.countdownEndsSource.asObservable();


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
            this.countdown = this.init;
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
            this.countdown = this.countdown - 1;
            this.processCountdown();
        }, 1000);
    }

    private processCountdown() {
        if (this.countdown <= 0) {
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

