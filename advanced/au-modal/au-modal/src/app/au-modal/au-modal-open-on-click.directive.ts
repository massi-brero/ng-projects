import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set auModalOpenOnClick(els: HTMLButtonElement[] | HTMLButtonElement) {

    if (els instanceof HTMLButtonElement) {
      els = [els]
    }

    els.forEach(btn => {
      btn.addEventListener('click', () => {
        this.viewContainer.clear()
        this.viewContainer.createEmbeddedView(this.templateRef)
      })
    })
  }


}
