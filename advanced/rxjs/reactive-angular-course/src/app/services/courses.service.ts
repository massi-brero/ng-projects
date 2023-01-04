import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Course } from '../model/course'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { map, shareReplay } from 'rxjs/operators'

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
}
