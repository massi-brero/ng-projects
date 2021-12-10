import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent {

  @Input()
  body: TemplateRef<any>

  constructor() {
  }

  closeModal() {

  }

}
