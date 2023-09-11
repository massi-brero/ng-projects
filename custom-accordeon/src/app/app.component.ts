import { Component } from '@angular/core';

import { AccordeonContent } from './mb-accordeon/accordeon-content.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MB Akkordeon';
  list: AccordeonContent[] = [
    {
      title: 'Title 1',
      copy: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
    },
    {
      title: 'Title 2',
      copy: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
    },
  ];
}
