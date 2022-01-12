import { Injectable } from '@angular/core'
import {RegisterRequestInterface} from "../../types/registerRequest.interface";
import {Observable} from "rxjs";

@Injectable(

)
export class AuthService {
  register(data: RegisterRequestInterface): Observable<any> {
    return null
  }
}
