import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import {By} from '@angular/platform-browser';
import {TaskComponent} from '../../task.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('TaskList Component', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TaskComponent, TaskListComponent],
      }).compileComponents();
    }));

    it('renders pinned tasks at the start of the list', () => {
      fixture = TestBed.createComponent(TaskListComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
      const lastTaskInput = fixture.debugElement.query(By.css('.list-item:nth-child(1)'));

      expect(lastTaskInput.nativeElement.id).toEqual(6);
    });

  });
});
