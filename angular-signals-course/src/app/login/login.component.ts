import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MessageService } from '../messages/message.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder)
  messageService = inject(MessageService)
  authService = inject(AuthService)
  router = inject(Router)
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  /**
   * Testen mit:
   * email: 'test@test.de',
   * password: 'test',
   */
  async onLogin() {
    try {
      const { email, password } = this.form.value
      if (!email || !password) {
        this.messageService.showMessage('Geben Sie ihre Email und Ihr Passwort an!', 'error')
        return
      }
      await this.authService.login(email, password)
      await this.router.navigate(['/'])
    } catch (e) {
      console.log(e)
      this.messageService.showMessage('Login fehlgeschlagen!', 'error')
    }
  }
}
