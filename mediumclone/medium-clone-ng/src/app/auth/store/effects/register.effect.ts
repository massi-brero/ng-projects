import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction} from "../actions/register.action";

@Injectable()


export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(ofType(registerAction)))

  constructor(
    private actions$: Actions
  ) {
  }
}
