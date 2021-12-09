import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuModalComponent} from './au-modal.component';
import { AuModalOpenOnClickDirective } from './au-modal-open-on-click.directive';
import { AuTabComponent } from 'au-tab-panel/src/app/au-tab/au-tab.component';


@NgModule({
  declarations: [AuModalComponent, AuModalOpenOnClickDirective],
  imports: [
    CommonModule
  ],
  exports: [
    AuModalComponent,
    AuModalOpenOnClickDirective
  ]
})
export class AuModalModule {


}



