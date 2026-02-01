import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  applyEach,
  email,
  FormField as Field,
  form,
  required,
  validate,
  ValidationError,
  min,
  max,
  validateTree,
} from '@angular/forms/signals';
import { DinnerReview } from './models/dinner-review.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Field],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly model = signal<DinnerReview>({
    username: 'Kobi Hari',
    role: 'user',
    email: 'kobi2294@yahoo.com',
    description: 'The dinner was very nice, we enjoyed it so much',
    reviews: [
      {
        aspect: 'Food',
        rating: 4,
        recommendation: 'recommend',
      },
      {
        aspect: 'Service',
        rating: 5,
        recommendation: 'recommend',
      },
    ],
  });

  addReviewItem() {
    this.model.update((oldValue) => ({
      ...oldValue,
      reviews: [
        ...oldValue.reviews,
        {
          aspect: '',
          rating: 3,
          recommendation: 'no-opinion',
        },
      ],
    }));
  }

  removeItem(index: number) {
    this.model.update((oldValue) => ({
      ...oldValue,
      reviews: oldValue.reviews.filter((_, i) => i !== index),
    }));
  }

  /**
   * Reactive form configuration for user reviews with validation rules.
   *
   * Validates the following fields:
   * - `username`: Required field
   * - `email`: Required when role is not 'author', must be in valid email format
   * - `description`: Custom validation requiring minimum word count (10 words for authors, 5 for others)
   * - `reviews[].rating`: Array of ratings with minimum value of 1 and maximum value of 5
   *
   * @readonly
   * @type {Form}
   */
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

    applyEach(path.reviews, (reviewPath) => {
      min(reviewPath.rating, 1, {
        message: 'Minimum is 1.',
      });
      max(reviewPath.rating, 5, {
        message: 'Maximum is 5.',
      });
      required(reviewPath.aspect, {
        message: 'Aspect is required.',
      });
      validateTree(reviewPath, (ctx) => {
        const rating = ctx.valueOf(reviewPath.rating);
        const recommendation = ctx.valueOf(reviewPath.recommendation);

        if (rating >= 4 && recommendation === 'not-recommend') {
          return [
            {
              kind: 'inconsistent-rating-recommendation',
              message: 'High ratings should have a positive recommendation',
              fieldTree: ctx.fieldTreeOf(reviewPath.rating),
            } as ValidationError.WithOptionalField,
            {
              kind: 'inconsistent-rating-recommendation',
              message: 'High ratings should have a positive recommendation',
              fieldTree: ctx.fieldTreeOf(reviewPath.recommendation),
            } as ValidationError.WithOptionalField,
          ];
        }
        return undefined;
      });
    });
  });
}
