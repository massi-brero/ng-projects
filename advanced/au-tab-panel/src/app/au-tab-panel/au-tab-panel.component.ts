import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core'
import { AuTabComponent } from '../au-tab/au-tab.component'

@Component({
  selector: 'au-tab-panel',
  templateUrl: './au-tab-panel.component.html',
  styleUrls: ['../tab-panel.component.scss'],
})
export class AuTabPanelComponent implements AfterContentInit {
  @ContentChildren(AuTabComponent)
  tabs: QueryList<AuTabComponent>

  constructor() {}

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(tab => tab.selected)

    if (!selectedTab) {
      this.tabs.first.selected = true
    }
  }

  selectTab(tabClicked: AuTabComponent) {
    this.tabs.forEach(tab => tab.selected = false)
    tabClicked.selected = true
  }
}
