import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    userSub: Subscription;
    isAuthenticated = false;

    constructor(private dataService: DataService, private authSerService: AuthService) {}

    ngOnInit() {
      this.userSub = this.authSerService.user.subscribe(user => {
        this.isAuthenticated = !!user;
      });
    }

    onSaveData() {
        this.dataService.storeRecipes();
    }

    onFetchData() {
        this.dataService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }
}
