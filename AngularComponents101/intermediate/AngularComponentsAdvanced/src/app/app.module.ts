import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {DisplayComponent} from './display/display.component';
import {TimerComponent} from './timer/timer.component';
import {AlertViewComponent} from './alert-view/alert-view.component';
import {TabsComponent} from './tabs/tabs.component';
import {TabComponent} from './tab/tab.component';
import {SimpleAlertViewComponent} from './simple-alert-view/simple-alert-view.component';
import {TimerNativeComponent} from './timer-native/timer-native.component';
import {TimerNoneComponent} from './timer-none/timer-none.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        ProgressBarComponent,
        DisplayComponent,
        TimerComponent,
        TimerNativeComponent,
        TimerNoneComponent,
        AlertViewComponent,
        TabsComponent,
        TabComponent,
        SimpleAlertViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    entryComponents: [
        SimpleAlertViewComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
