import { Directive } from '@angular/core';

@Directive({
  selector: '[appFoo]',
  standalone: true
})
export class FooDirective {

  constructor() { }

}
