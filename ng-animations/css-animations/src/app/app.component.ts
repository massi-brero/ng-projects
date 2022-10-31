import {Component, ElementRef, ViewChild} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'css-animations'
  divClicked = false
  animate = false

  onClickDiv() {
    this.divClicked = !this.divClicked
  }
}
