import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinnerReview } from './models/dinner-review.model';
import {
  email,
  FieldContext,
  FieldValidator,
  form,
  FormField,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly model = signal<DinnerReview>({
    username: '',
    role: 'user',
    email: '',
    description: '',
    rating: 1,
  });

  readonly reviewForm = form(this.model, (path) => {
    required(path.username, { message: 'Username is required' });
    required(path.email, {
      message: 'Email is required',
      when: (ctx) => ctx.valueOf(path.role) !== 'author',
    });
    email(path.email, { message: 'Email must be valid' });
    validate(path.description, (ctx) => {
      const wordArray = ctx.valueOf(path.description).trim().split(/\s+/);
      const wordCount = (wordArray.length = 1 && wordArray[0] === '' ? 0 : wordArray.length);
      const threshhold = ctx.valueOf(path.role) === 'author' ? 10 : 5;
      return wordCount >= threshhold
        ? null
        : {
            kind: 'minWords',
            message: `Description must be at least ${threshhold} words long (Currently there are ${wordCount} words)`,
          };
    });
  });
}
