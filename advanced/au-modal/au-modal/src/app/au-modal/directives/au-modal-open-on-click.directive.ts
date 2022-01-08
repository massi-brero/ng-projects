import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'
import { AuModalService } from '../services/au-modal.service'

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {

  buttons: HTMLButtonElement[]
  clickHandler = (() => {
    this.viewContainer.clear()
    this.viewContainer.createEmbeddedView(this.templateRef)
  }).bind(this)

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService
  ) {
  }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => {
      this.viewContainer.clear()
    })
  }

  ngOnDestroy() {
    this.buttons.forEach(btn => btn.removeEventListener(
      'click',
      this.clickHandler
    ))
  }

  @Input()
  set auModalOpenOnClick(els: HTMLButtonElement[] | HTMLButtonElement) {

    if (els instanceof HTMLButtonElement) {
      els = [els]
    }

    els.forEach(btn => {
      btn.addEventListener('click', this.clickHandler)
    })
  }

}
