import { Injectable, resource, signal } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly apiBaseUrl = 'https://localhost:3000/api/books';
  readonly wsBaseUrl = 'https://localhost:3000/ws';

  #keyword = signal<string>('');
  #searchResults = resource({
    params: () => ({ keyword: this.#keyword() }),
    loader: (options) => this.#searchKeywordPromise(options.params.keyword),
    defaultValue: [] as Book[],
  });

  get searchResults() {
    return this.#searchResults.asReadonly();
  }

  get keyword() {
    return this.#keyword.asReadonly();
  }

  setKeyword(newKeyword: string) {
    this.#keyword.set(newKeyword);
  }

  #searchKeywordPromise(value: string): Promise<Book[]> {
    const url = `${this.apiBaseUrl}/search?keyword=${value}`;
    return fetch(url).then((response) => response.json());
  }

  constructor() {}
}
