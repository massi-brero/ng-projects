import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { authResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | undefined;

  form = this.fb.group(
    {
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    },
    { updateOn: "blur" }
  );

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;
    let auth$: Observable<authResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      auth$ = this.authService.login(email, password);
    } else {
      auth$ = this.authService.signup(email, password);
    }

    auth$.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
      },
      (err) => {
        this.error = err;
        this.isLoading = false;
      }
    );

    this.form.reset();
  }
}
