import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import {User} from '../model/user'
import {map, shareReplay, tap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'

export interface Credentials {
  email: string,
  password: string
}

const AUTH_DATA = 'auth_data'

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private userSubj = new BehaviorSubject<User>(null)
  user$ = this.userSubj.asObservable()

  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>

  constructor(private http: HttpClient) {

    this.isLoggedIn$ = this.user$.pipe(
      map(user => !!user)
    )

    this.isLoggedOut$ = this.isLoggedIn$.pipe(
      map(isLoggedIn => !isLoggedIn)
    )

    const user = localStorage.getItem(AUTH_DATA)

    if (user) {
      this.userSubj.next(JSON.parse(user))
    }
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(environment.apiLoginUrl, credentials)
      .pipe(
        tap((user: User) => {
          this.userSubj.next(user)
          localStorage.setItem(AUTH_DATA, JSON.stringify(user))
        }),
        shareReplay()
      )
  }

  logout(): void {
    this.userSubj.next(null)
    localStorage.removeItem(AUTH_DATA)
  }
}
