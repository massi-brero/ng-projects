import { Injectable, resource, signal } from '@angular/core';
import { Book } from '../models/book';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly apiBaseUrl = 'http://localhost:3000/api/books';
  readonly wsBaseUrl = 'ws://localhost:3000/ws';

  #keyword = signal<string>('');
  // #searchResults = resource({
  //   params: () => ({ keyword: this.#keyword() }),
  //   loader: (options) => this.#search(options.params.keyword),
  //   defaultValue: [] as Book[],
  // });
  #searchResult = httpResource<Book[]>(
    () => ({
      url: `${this.apiBaseUrl}/search`,
      params: {
        q: this.#keyword(),
      },
    }),
    { defaultValue: [] },
  );

  #books = httpResource<Book[]>(
    () => ({
      url: `${this.apiBaseUrl}`,
    }),
    { defaultValue: [] },
  );

  get books() {
    return this.#books.asReadonly();
  }

  get searchResult() {
    return this.#searchResult.asReadonly();
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
}
