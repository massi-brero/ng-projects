import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooDirective } from './foo.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooDirective, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'standalone-app';
}
