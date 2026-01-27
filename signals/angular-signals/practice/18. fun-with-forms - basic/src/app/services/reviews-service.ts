import { Injectable } from '@angular/core';
import { DinnerReview } from '../models/dinner-review.model';
import { ValidationError, FieldTree } from '@angular/forms/signals';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  async submitReview(reviewForm: FieldTree<DinnerReview>) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const res: ValidationError[] = [];

    const review = reviewForm().value();
    // If the email is not in the best-dinner.com domain, reject the review
    if (!review.email.endsWith('@best-dinner.com')) {
      res.push({
        message: 'Only best-dinner.com emails are allowed to submit reviews.',
        kind: 'email-domain',
        fieldPath: ['email'],
      } as ValidationError);
    }

    // If the username is "Kobi Hari", he can only submit reviews as an author
    if (review.username.toLowerCase() === 'kobi hari' && review.role !== 'author') {
      res.push({
        message: 'Kobi Hari can only submit reviews as an author.',
        kind: 'invalid-role',
        fieldPath: ['role'],
      } as ValidationError);
    }

    return res.length ? res : undefined;
  }
}
