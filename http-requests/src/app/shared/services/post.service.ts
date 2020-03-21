import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { Post } from '../models/Post';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  endpoint = 'https://ng-http-90b6e.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  save(title: string, content: string): Observable<any> {
    const post: Post = { title: title, content: content };
    const httpOptions: { headers; observe } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'events'
    };
    return this.http
      .post<{ name: string }>(this.endpoint, post, httpOptions)
      .pipe(mergeMap(() => this.fetch()));
  }

  fetch() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('foo', 'bar');
    return this.http
      .get<{ [key: string]: Post }>(this.endpoint, {
        headers: new HttpHeaders({
          'Custom-Header': 'foo'
        }),
        params: searchParams
      })
      .pipe(
        map(data => {
          const posts = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              posts.push({ ...data[key], id: key });
            }
          }
          return posts;
        }),
        catchError(errorrRes => {
          return throwError(errorrRes);
        })
      );
  }

  delete() {
    return this.http
      .delete(this.endpoint, {
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        tap(data => {
          console.log(data);
        })
      );
  }
}
