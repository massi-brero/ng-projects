import {Component, OnInit, Input} from '@angular/core';
import {Tab} from './tab.interface';
import {TabsComponent} from '../tabs/tabs.component';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

    @Input() title: string;
    public isActive = false;

    /**
     *
     * @param tabs parent element ... DI works because this component within parent's tags; see app.component.ts (??)
     *
     */
    constructor(public tabs: TabsComponent) {
    }

    ngOnInit() {
        this.tabs.addTab(this);
    }

}
