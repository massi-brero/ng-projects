import {Component} from '@angular/core'
import {state, style, trigger} from '@angular/animations'

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
        })
      ),
      state('clicked',
        style({
          backgroundColor: 'blue',
          width: '300px',
          height: '50px',
        })
      )
    ])
  ]
})
export class AppComponent {
  title = 'ng-animations-2'
}