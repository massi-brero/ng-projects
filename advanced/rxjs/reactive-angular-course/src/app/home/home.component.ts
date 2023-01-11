import { Component, OnInit } from '@angular/core'
import { Course, sortCoursesBySeqNo } from '../model/course'
import { interval, noop, Observable, of, throwError, timer } from 'rxjs'
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { CourseDialogComponent } from '../course-dialog/course-dialog.component'
import { CoursesService } from '../services/courses.service'
import { LoadingService } from '../services/loading.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>

  advancedCourses$: Observable<Course[]>

  constructor(
    private http: HttpClient,
    private coursesService: CoursesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadCourses()
  }

  loadCourses() {
    this.loadingService.loadingOn()
    const courses$ = this.coursesService.loadAllCourses().pipe(
      map((courses: Course[]) => courses.sort(sortCoursesBySeqNo)),
      finalize(() => this.loadingService.loadingOff())
    )

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category === 'BEGINNER')
      )
    )
    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category === 'ADVANCED')
      )
    )
  }
}