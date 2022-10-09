import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-animations-1';

  isFavorite = false;
  isBoring = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite
  }

  toggleBoring() {
    this.isBoring = !this.isBoring;
  }
}
