import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

  @Directive({
    selector: '[appBasicHighlight]'
  })
  export class BasicHighlightDirective implements OnInit{
    constructor(private element: ElementRef) { }

    ngOnInit(): void {
      this.element.nativeElement.style.backgroundColor = 'green';
    }

  }
