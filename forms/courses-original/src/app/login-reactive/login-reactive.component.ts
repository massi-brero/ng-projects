import { Component, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    NonNullableFormBuilder,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { createPasswordStrengthValidator } from '../validators/password-strength.validator'

@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent {
    loginForm = this.initForm()

    constructor(private fb: NonNullableFormBuilder) {}

    private initForm() {
        return this.fb.group({
            email: [
                '',
                [Validators.required, Validators.email],
                null,
                { updateOn: 'blur' },
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.min(8),
                    createPasswordStrengthValidator(),
                ],
                null,
            ],
        })
    }

    login() {
        const formValue = this.loginForm.value

        this.loginForm.patchValue({})
    }

    reset() {
        this.loginForm.reset()
    }
}
