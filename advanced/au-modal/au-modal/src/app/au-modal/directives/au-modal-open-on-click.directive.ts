import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from '../services/au-modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService
  ) {
  }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => {
      this.viewContainer.clear()
    });
  }

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
