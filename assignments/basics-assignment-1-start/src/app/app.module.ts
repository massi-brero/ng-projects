import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { FailMsgComponent } from './fail-msg/fail-msg.component';
import { ResetButtonComponent } from './reset-button/reset-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessMsgComponent,
    FailMsgComponent,
    ResetButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
