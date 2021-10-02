import {AfterContentChecked, AfterContentInit, Component, ContentChildren, QueryList, OnDestroy, OnInit} from '@angular/core';
import {TabComponent} from 'app/tab/tab.component';
import {Tab} from '../tab/tab.interface';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

    // must be projected with ngContent; maps only 1 (first child it finds)
    // @ContentChild(TabComponent) tab: TabComponent;
    //     public tabs: Tab[] = [];
    @ContentChildren(TabComponent) public tabs: QueryList<TabComponent> = null;
    private tabClickSubscriptions: Subscription[] = [];

    constructor() {
    }

    ngOnDestroy(): void {
        if (this.tabClickSubscriptions) {
            this.tabClickSubscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        }
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        // console.log(this.tabs);
        this.tabs.forEach(tab => {
            let subscription = tab.onClick.subscribe(() => {
                console.log(`tab ${tab.title} was clicked`);
            });
            this.tabClickSubscriptions.push(subscription);
        });
        // if (this.tab) {
        //     console.log(this.tab);
        //     this.addTab(this.tab);
        //     this.tab.onClick.subscribe(() => {
        //         console.log("tab content click");
        //     });
        // }
        this.selectTab(this.tabs.first);
    }

    // addTab(tab: Tab) {
    //     if (this.tabs.length === 0) {
    //         tab.isActive = true;
    //     }
    //     this.tabs.push(tab);
    // }

    selectTab(tab: Tab) {
        // for (const otherTab of this.tabs) {
        //     otherTab.isActive = false;
        // }
        // tab.isActive = true;
        this.tabs.forEach(tab => tab.isActive = false);
        tab.isActive = true;
    }


}
