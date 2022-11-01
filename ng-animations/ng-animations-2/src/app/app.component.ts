import {Component} from '@angular/core'
import {animate, state, style, transition, trigger} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('clickedState', [
      state('default',
        style({
          backgroundColor: 'orange',
          width: '100px',
          height: '100px',
        })),
      state('clicked',
        style({
          backgroundColor: 'blue',
          width: '300px',
          height: '50px',
        })),
      state('mousedown',
        style({
          backgroundColor: 'red',
          //border: '1px solid black',
          width: '100px',
          height: '100px'
        })),
      transition(
        'default => clicked',
        animate('600ms 500ms ease-in',)
      ),
      transition(
        'clicked => default',
        animate(300)
      ),
      transition(
        'mousedown <=> clicked',
        animate(300)
      ),
    ])
  ]
})
export class AppComponent {
  title = 'ng-animations-2'
  clickInfo = 'default'
  pClicked = 'default'
  numberEntered: string | undefined


  onClickSimple() {
    this.clickInfo = 'clicked'
    setTimeout(_ => {
        this.clickInfo = 'default'
      }, 1500
    )
  }

  storeNumber(e: Event) {
    this.numberEntered = (e.target as HTMLInputElement).value
  }
}
