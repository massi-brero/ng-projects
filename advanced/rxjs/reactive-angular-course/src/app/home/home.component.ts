import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MessagesService } from '../messages/services/messages.service';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CoursesStore } from '../services/courses.store';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>
  advancedCourses$: Observable<Course[]>

  constructor(private coursesStore: CoursesStore) {}

  ngOnInit() {
    this.loadCourses()
  }

  loadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER')
    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED')
  }
}
