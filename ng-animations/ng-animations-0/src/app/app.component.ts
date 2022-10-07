import { Component } from '@angular/core';
import { Goal } from 'src/types/Goal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ng-animations'
    courseGoals: Goal[] = [
        {
            title: 'Master Angular Styling',
            isActive: true,
        },
        {
            title: 'Understand Angular Animations',
            isActive: true,
        },
        {
            title: 'Master Angular Animations',
            isActive: false,
        },
    ]

    activateGoal(goal: Goal) {
        goal.isActive = !goal.isActive
    }
}
