import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinnerReview } from './models/dinner-review.model';
import {
  email,
  FormField,
  form,
  minLength,
  required,
  validate,
  ValidationError,
  validateTree,
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
    recommendation: 'no-opinion',
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
    validateTree(path, (ctx) => {
      const rating = ctx.valueOf(path.rating);
      const recommendation = ctx.valueOf(path.recommendation);
      console.log(rating >= 4 && recommendation === 'not-recommend');

      if (rating >= 4 && recommendation === 'not-recommend') {
        return [
          {
            kind: 'inconsistent-rating-recommendation',
            message: 'High ratings should have a positive recommendation',
            field: path.recommendation,
          } as ValidationError,
          {
            kind: 'inconsistent-rating-recommendation',
            message: 'High ratings should have a positive recommendation',
            field: path.rating,
          } as ValidationError,
        ];
      }

      return null;
    });
  });
}
