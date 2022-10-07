import { Component, Input, OnInit } from '@angular/core';
import { Goal } from 'src/types/Goal';

@Component({
    selector: 'app-goal',
    templateUrl: './goal.component.html',
    styleUrls: ['./goal.component.scss'],
})
export class GoalComponent implements OnInit {
    @Input() goal: Goal | undefined

    constructor() {}

    ngOnInit(): void {}
}
