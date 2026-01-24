import { Injectable, linkedSignal, resource, signal } from '@angular/core';
import { Book } from '../models/book';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly apiBaseUrl = 'http://localhost:3000/api/books';
  readonly wsBaseUrl = 'ws://localhost:3000/ws';
  #selectedBookId = linkedSignal<Book[], string>({
    source: () => this.#searchResult.value(),
    computation: (src, prev) => {
      if (!prev) {
        return src.length > 0 ? src[0].id : '';
      }
      if (prev.value === '' && src.length > 0) {
        return src[0].id;
      }
      return prev.value;
    },
  });

  #keyword = signal<string>('');
  // #searchResults = resource({
  //   params: () => ({ keyword: this.#keyword() }),
  //   loader: (options) => this.#search(options.params.keyword),
  //   defaultValue: [] as Book[],
  // });
  #books = httpResource<Book[]>(
    () => ({
      url: `${this.apiBaseUrl}`,
    }),
    { defaultValue: [] },
  );
  #searchResult = httpResource<Book[]>(
    () => ({
      url: `${this.apiBaseUrl}/search`,
      params: {
        q: this.#keyword(),
      },
    }),
    { defaultValue: this.#books.value() },
  );

  get selectedBookId() {
    return this.#selectedBookId.asReadonly();
  }

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

  setSelecetedBookId(newId: string) {
    this.#selectedBookId.set(newId);
  }
}
