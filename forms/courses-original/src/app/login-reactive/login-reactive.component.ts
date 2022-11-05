import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'

@Component({
    selector: 'login',
    templateUrl: './login-reactive.component.html',
    styleUrls: ['./login-reactive.component.css'],
})
export class LoginReactiveComponent implements OnInit {
    loginForm: FormGroup

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.initForm()
    }

    private initForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.min(8)]],
        })
    }
}
