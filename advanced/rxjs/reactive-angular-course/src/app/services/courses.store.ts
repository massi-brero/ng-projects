import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { MessagesService } from '../messages/services/messages.service';
import { Course, sortCoursesBySeqNo } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesStore {
  private coursesSubj = new BehaviorSubject<Course[]>([])
  courses$ = this.coursesSubj.asObservable()

  constructor(private http: HttpClient, private messages: MessagesService) {
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

  private loadAllCourses() {
    this.http.get<Course[]>(environment.apiCoursesUrl).pipe(
      map((res) => res['payload']),
      catchError((err) => {
        const msg = 'Could not load courses'
        this.messages.showErrors(msg)
        console.log(msg, err)
        return throwError(err)
      })
    )
  }
}
