import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Tab} from './tab.interface';
import {TabsComponent} from '../tabs/tabs.component';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

    @Output() onClick = new EventEmitter<void>();
    @Input() title: string;
    public isActive = false;

    /**
     *
     * @param tabs parent element
     *
     */
    constructor(
        // public tabs: TabsComponent
    ) {
    }

    ngOnInit() {
        // this.tabs.addTab(this);
    }

    clickTabContent() {
        this.onClick.emit();
    }
}
