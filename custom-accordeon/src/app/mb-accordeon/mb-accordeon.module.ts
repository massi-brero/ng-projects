import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordeonItemComponent } from './accordeon-item/accordeon-item.component';
import { MbAccordeonComponent } from './mb-accordeon.component';

@NgModule({
  declarations: [MbAccordeonComponent],
  imports: [CommonModule, AccordeonItemComponent],
  exports: [MbAccordeonComponent],
})
export class MbAccordeonModule {}
