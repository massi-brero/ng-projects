import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  of,
  Subject,
  throwError,
} from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userSubj = new BehaviorSubject<User | null>(null);
  user$ = this.userSubj.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    email: string,
    password: string
  ): Observable<string | authResponseData> {
    return this.http
      .post<authResponseData>(`${environment.signUpURL}${environment.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((res: authResponseData) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<authResponseData>(`${environment.signInURL}${environment.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((res: authResponseData) => {
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSubj.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData") ?? "");
    console.log(userData);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {

      this.userSubj.next(loadedUser);
    }
  }

  logout() {
    this.userSubj.next(null);
    this.router.navigate(["/auth"]);
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (!err.error?.error?.message) {
      throwError("Unkown Error");
    }
    return throwError(err.error.error.message.replace(/_/g, " "));
  }
}
