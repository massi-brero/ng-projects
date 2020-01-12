import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../shared/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() loading = false;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPinTask: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onArchiveTask: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
