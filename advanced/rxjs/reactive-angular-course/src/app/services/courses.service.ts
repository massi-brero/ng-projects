import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Course } from '../model/course'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { map, shareReplay } from 'rxjs/operators'
import { Lesson } from '../model/lesson'

@Injectable({ providedIn: 'root' })
export class CoursesService {
  constructor(private http: HttpClient) {}

  loadAllCourses(): Observable<Course[]> {
    return this.http
      .get<HttpResponse<Course[]>>(environment.apiCoursesUrl)
      .pipe(
        map((res: HttpResponse<Course[]>) => {
          return res['payload']
        }),
        shareReplay()
      )
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(`${environment.apiCoursesUrl}/${courseId}`, changes)
      .pipe(shareReplay())
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>(environment.searchUrl, {
        params: {
          filter: search,
          pageSize: '100',
        },
      })
      .pipe(
        map((res) => res['payload']),
        shareReplay()
      )
  }

  loadCourseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`${environment.apiCoursesUrl}/${courseId}`)
      .pipe(shareReplay())
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>(environment.apiLessonsUrl, {
        params: {
          pageSize: '1000',
          courseId: courseId.toString(),
        },
      })
      .pipe(
        map((res) => res['payload']),
        shareReplay()
      )
  }
}
