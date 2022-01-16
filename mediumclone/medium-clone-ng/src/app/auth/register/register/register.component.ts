import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { registerAction } from '../../store/actions/register.action'
import { Observable } from 'rxjs'
import { AppStateInterface } from '../../../shared/types/appState.interface'
import { isSubmittingSelector } from '../../store/selectors'
import { AuthService } from '../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface'
import {RegisterRequestInterface} from "../../types/registerRequest.interface";

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.form.value, this.form.valid)
    const req: RegisterRequestInterface = {
      user : this.form.value
    }
    this.store.dispatch(registerAction({ req }))
    this.authService
      .register({ user: this.form.value })
      .subscribe((currentUser: CurrentUserInterface) => {
        console.log(currentUser)
      })
  }

  private initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log('isSubmitting$', this.isSubmitting$)
  }
}
