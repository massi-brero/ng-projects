import { Component, Input } from '@angular/core';

import { AccordeonContent } from './accordeon-content.interface';

@Component({
  selector: 'app-mb-accordeon',
  templateUrl: './mb-accordeon.component.html',
  styleUrls: ['./mb-accordeon.component.scss'],
})
export class MbAccordeonComponent {
  @Input() items: AccordeonContent[] = [];
}
