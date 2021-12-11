import { Component } from '@angular/core';
import {RoleGroups} from "./shared/constants/roleGroups";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userGroups = RoleGroups;
  title = 'custom-directives';
}
