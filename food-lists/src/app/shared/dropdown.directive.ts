import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    OnInit,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
    @HostBinding('class.open') isOpen: boolean;

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.isOpen = false;
    }

    @HostListener('click') toggleOpen(event: Event) {
        console.log('huhu');

        this.isOpen = !this.isOpen;
    }
}
