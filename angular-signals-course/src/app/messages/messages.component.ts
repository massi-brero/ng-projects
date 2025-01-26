import { Component, inject } from '@angular/core'
import { MessageService } from './message.service'
import { NgClass } from '@angular/common'

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [NgClass],
})
export class MessagesComponent {
  messageService = inject(MessageService)
  message = this.messageService.message

  onClose() {
    this.messageService.clear()
  }
}
