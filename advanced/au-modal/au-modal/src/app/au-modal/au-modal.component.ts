import { Component, Input, OnInit, TemplateRef } from '@angular/core'
import { AuModalService } from './services/au-modal.service'
import { EventManager } from '@angular/platform-browser'

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {

  @Input()
  body: TemplateRef<any>

  @Input()
  hideOnEsc = true

  @Input()
  hideOnClickBackdrop = true

  constructor(
    private modalService: AuModalService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    if (this.hideOnEsc) {
      this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
        this.closeModal()
      })
    }
  }

  closeModal() {
    this.modalService.close()
  }

  cancelClick($event: MouseEvent) {
    $event.preventDefault()
    $event.stopPropagation()
  }

  onClickBackdrop() {
    if (this.hideOnClickBackdrop) {
      this.modalService.close()
    }
  }
}
