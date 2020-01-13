import {moduleMetadata, storiesOf} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {TaskComponent} from '../../task.component';
import {TaskListComponent} from './task-list.component';
import {task, actions} from '../../task.stories';


export const defaultTasks = [
  {...task, id: '1', title: 'task 1'},
  {...task, id: '2', title: 'task 2'},
  {...task, id: '3', title: 'task 3'},
  {...task, id: '4', title: 'task 4'},
  {...task, id: '5', title: 'task 5'},
  {...task, id: '6', title: 'task 6'},
];

export const withPinnedTasks = [
  ...defaultTasks.slice(0, 5),
  {is: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED'},
];

const props = {
  tasks: defaultTasks,
  onPinTask: actions.onPinTask,
  onArchiveTask: actions.onArchiveTask,
};

storiesOf('TaskList', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TaskListComponent, TaskComponent],
      imports: [CommonModule]
    })
  )
  .add('default', () => {
    return {
      template: `
       <div style="padding: 3rem">
          <app-task-list [tasks]="tasks" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)"></app-task-list>
        </div>
      `,
      props
    };
  })
  .add('withPinnedTasks', () => {
    return {
      template: `
        <div style="padding: 3rem">
          <app-task-list [tasks]="tasks" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)"></app-task-list>
        </div>
      `,
      props,
      tasks: withPinnedTasks
    };
  })
  .add('loading', () => {
    return {
      template: `
         <div style="padding: 3rem">
          <app-task-list [tasks]="[]" loading="true" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)"></app-task-list>
        </div>
      `,
      props,
      tasks: []
    };
  })
  .add('empty', () => {
    return {
      template: `
        <div style="padding: 3rem">
          <app-task-list [tasks]="[]" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)"></app-task-list>
        </div>
      `,
      props,
      tasks: []
    };
  })
;
