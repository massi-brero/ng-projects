import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
    }

    logCountdownEnd() {
        console.log('app component: the countdown has finished');
    }
}