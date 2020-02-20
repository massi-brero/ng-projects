import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../shared/task.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  title: string;
  @Input() task: Task;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPinTask = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onArchiveTask = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onArchive(id: number) {
    this.onPinTask.emit(id);
  }

  onPin(id: number) {
    this.onPinTask.emit(id);
  }

}
