import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuModalComponent } from './au-modal.component'
import { AuModalOpenOnClickDirective } from './directives/au-modal-open-on-click.directive'
import { AuModalService } from './services/au-modal.service'


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

  /**
   * Allows to implement the service as a singleton.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuModalModule,
      providers: [AuModalService]
    }
  }
}



