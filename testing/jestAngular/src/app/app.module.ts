import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatchersComponent } from './matchers/matchers.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DataComponent } from './data/data.component'

@NgModule({
  declarations: [
    AppComponent,
    MatchersComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
