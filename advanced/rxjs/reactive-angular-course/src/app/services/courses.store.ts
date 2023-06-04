import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ObservableInput, throwError} from 'rxjs'
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { MessagesService } from '../messages/services/messages.service';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStore {
  private coursesSubj = new BehaviorSubject<Course[]>([])
  courses$ = this.coursesSubj.asObservable()

  constructor(
    private http: HttpClient,
    private messages: MessagesService,
    private loading: LoadingService
  ) {
    this.loadAllCourses()
  }

   filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course: Course) => course.category === category)
          .sort(sortCoursesBySeqNo)
      )
    )
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    const courses = this.coursesSubj.getValue()
    const idx = courses.findIndex((course: Course) => course.id === courseId)
    const newCourse: Course = {
      ...courses[idx],
      ...changes,
    }

    const newCourses: Course[] = courses.slice(0)
    newCourses[idx] = newCourse
    this.coursesSubj.next(newCourses)

    return this.http
      .put<Partial<Course>>(`${environment.apiCoursesUrl}/${courseId}`, changes)
      .pipe(
        catchError(this.handleError('Could not save courses')),
        shareReplay())
  }

  private loadAllCourses() {
    const loadCourses$ = this.http
      .get<Course[]>(environment.apiCoursesUrl)
      .pipe(
        map((res) => res['payload']),
        catchError(this.handleError('Could not load courses')),
        tap((courses: Course[]) => this.coursesSubj.next(courses))
      )
    this.loading.showLoaderUntilCompleted(loadCourses$).subscribe()
  }

  private handleError(message: string): (err: any, caught: Observable<any>) => ObservableInput<any> {
    return (err) => {
      this.messages.showErrors(message)
      console.log(message, err)
      return throwError(err)
    }
  }
}
