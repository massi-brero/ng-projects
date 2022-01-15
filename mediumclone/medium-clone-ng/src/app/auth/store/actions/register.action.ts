import { createAction, props } from '@ngrx/store'
import { ActionTypes } from '../actionTypes'
import { RegisterRequestInterface } from '../../types/registerRequest.interface'
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ req: RegisterRequestInterface }>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ req: CurrentUserInterface }>()
)

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE
)