import {AfterContentInit, Component, ContentChild, HostBinding, Input, OnInit, ViewEncapsulation,} from '@angular/core'
import {InputRefDirective} from '../common/input-ref.directive'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuFaInputComponent implements OnInit, AfterContentInit {
  @Input() icon: string
  @ContentChild(InputRefDirective) input: HTMLInputElement

  constructor() {
  }

  @HostBinding('class.input-focus')
  get isInputFocus() {
    return this.input ? this.input.focus : false
  }

  ngAfterContentInit(): void {
    if (!this.input) {
      console.error('This component needs an input inside its content.')
    }
  }

  ngOnInit(): void {
  }

  get classes() {
    const cssClasses = {
      fa: true,
    }

    if (this.icon) {
      cssClasses[`fa-${this.icon}`] = true
    }

    return cssClasses
  }
}
