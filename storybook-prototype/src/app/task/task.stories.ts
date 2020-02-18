import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TaskComponent} from './task.component';
import {withA11y} from "@storybook/addon-a11y";

export const task = {
  id: '1',
  title: 'IMVS.neu initialisieren',
  state: 'TASK_INBOX',
  updatedAt: new Date(2020, 1, 8, 14, 0)
};

export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask')
};

storiesOf('Task', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TaskComponent]
    })
  )
  .addDecorator(withA11y)
  .add('default', () => {
    return {
      template: `<app-task-item [task]="task" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)" ></app-task-item>`,
      props: {
        task,
        onPinTask: actions.onPinTask,
        onArchiveTask: actions.onArchiveTask
      }
    };
  })
  .add('pinned', () => {
    return {
      template: `<app-task-item [task]="task" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)" ></app-task-item>`,
      props: {
        task: {...task, state: 'TASK_PINNED'},
        onPinTask: actions.onPinTask,
        onArchiveTask: actions.onArchiveTask
      }
    };
  })
  .add('archived', () => {
    return {
      template: `<app-task-item [task]="task" (onPinTask)="onPinTask($event)" (onArchiveTask)="onArchiveTask($event)" ></app-task-item>`,
      props: {
        task: {...task, state: 'TASK_ARCHIVED'},
        onPinTask: actions.onPinTask,
        onArchiveTask: actions.onArchiveTask
      }
    };
  });
