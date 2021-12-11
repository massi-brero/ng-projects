import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[hideForRoles]'
})
export class HideForRolesDirective {

  private  userRoles: Array<string> = [
    'editor', 'contributor'
  ]

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input() set hideForRoles(hideForRoles: Array<string>) {
    const hideFor = hideForRoles || []

    if (hideFor.length > 0) {
      this.roleChecker(hideFor)
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
  }

  private roleChecker(hideFor: Array<string>) {
    if (this.userRoles.length === 0) { //??
      this.viewContainerRef.clear()
    } else {
      const idx = this.userRoles.findIndex(role => hideFor.indexOf(role) !== -1)
      return idx < 0 ? this.viewContainerRef.createEmbeddedView(this.templateRef)
        : this.viewContainerRef.clear();
    }
  }
}
