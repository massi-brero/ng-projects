import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import {select, Store} from '@ngrx/store'

import { registerAction } from '../../store/actions'
import {Observable} from "rxjs";
import {AppStateInterface} from "../../../shared/types/appState.interface";
import {isSubmittingSelector} from "../../store/selectors";

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
    private store: Store<AppStateInterface>
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
    this.store.dispatch(registerAction(this.form.value))
  }

  private initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log('isSubmitting$',this.isSubmitting$)
  }
}
