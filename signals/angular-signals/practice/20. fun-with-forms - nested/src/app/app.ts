import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinnerReview } from './models/dinner-review.model';
import {
  email,
  FormField,
  form,
  required,
  validate,
  ValidationError,
  max,
  maxLength,
  min,
} from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly model = signal<DinnerReview>({
    username: 'Kobi Hari',
    role: 'user',
    email: 'kobi2294@yahoo.com',
    description: 'The dinner was very nice, we enjoyed it so much',
    food: {
      rating: 1,
      recommendation: 'no-opinion',
    },
    service: {
      rating: 1,
      recommendation: 'no-opinion',
    },
  });

  readonly reviewForm = form(this.model, (path) => {
    required(path.username, {
      message: 'Username is required',
    });
    required(path.email, {
      message: 'Email is required',
      when: (ctx) => ctx.valueOf(path.role) !== 'author',
    });
    email(path.email, {
      message: 'Email is not in the correct format',
    });
    validate(path.description, (ctx) => {
      const value = ctx.value();
      const threshold = ctx.valueOf(path.role) === 'author' ? 10 : 5;

      // check that there are at least 10 words
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount < threshold) {
        return {
          kind: 'min-words',
          message: `Description needs to be at least ${threshold} words long (currently there are ${wordCount} words)`,
        } as ValidationError;
      }

      return undefined;
    });
    max(path.food.rating, 5, {
      message: 'Food rating cannot be more than 5',
    });
    min(path.food.rating, 0, {
      message: 'Food rating cannot be less than 0',
    });
    max(path.service.rating, 5, {
      message: 'Food rating cannot be more than 5',
    });
    min(path.service.rating, 0, {
      message: 'Food rating cannot be less than 0',
    });
  });
}
