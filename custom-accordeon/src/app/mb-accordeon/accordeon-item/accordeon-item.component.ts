import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordeon-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordeon-item.component.html',
  styleUrls: ['./accordeon-item.component.scss'],
})
export class AccordeonItemComponent {
  @Input() title: string = '';
  @Input() copy: string = '';
  isOpen = false;

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
