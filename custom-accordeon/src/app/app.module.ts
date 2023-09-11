import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MbAccordeonModule } from './mb-accordeon/mb-accordeon.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MbAccordeonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
