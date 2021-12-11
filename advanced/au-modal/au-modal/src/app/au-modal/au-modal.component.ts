import { Component, Input, TemplateRef } from '@angular/core';
import { AuModalService } from './services/au-modal.service';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent {

  @Input()
  body: TemplateRef<any>

  constructor(private modalService: AuModalService) {
  }

  closeModal() {
    this.modalService.close();
  }

  cancelClick($event: MouseEvent) {
    $event.preventDefault()
    $event.stopPropagation()
  }
}
