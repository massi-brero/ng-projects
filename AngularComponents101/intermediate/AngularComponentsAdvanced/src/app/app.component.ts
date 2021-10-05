import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ComponentFactoryResolver, ComponentRef,
    ElementRef,
    Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
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
    public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;

    @ViewChild("timerInput") timeInput: ElementRef;
    @ViewChild("alert", {read: ViewContainerRef, static: true}) alertContainer: ViewContainerRef;

    constructor(
        private timer: TimerService,
        private renderer: Renderer2,
        private resolver: ComponentFactoryResolver
    ) {
        this.timers = [3, 20, 100];
    }

    ngAfterViewInit(): void {
        this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'enter seconds');
        this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
        // this.timeInput.nativeElement.setAttribute('placeholder', 'enter seconds'); // th easy way with default renderer
        //this.timeInput.nativeElement.classList.add('time-in');
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
        setTimeout(() => {
            // this.timeInput.nativeElement.focus(); // not platform safe
            this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
        });
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
        const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
        this.simpleAlert = this.alertContainer.createComponent(alertFactory);
        this.simpleAlert.instance.title = 'Timer ended.'
        this.simpleAlert.instance.message = 'Your countdown has finished.'
        this.simpleAlert.instance.onDismiss.subscribe(() => {
            this.simpleAlert.destroy();
        })

        this.simpleAlert.instance.show();
    }

    // hideEndTimerAlert() {
    //     this.isEndTimerVisible = false;
    // }
}
