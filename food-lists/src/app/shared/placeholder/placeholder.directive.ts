import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
    viewRef: ViewContainerRef;
    constructor(public view: ViewContainerRef) {
        this.viewRef = view;
    }
}
