import {
  inject,
  Injectable,
  linkedSignal,
  resource,
  ResourceStreamItem,
  signal,
} from '@angular/core';
import { Book } from '../models/book';
import { HttpClient, httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly apiBaseUrl = 'http://localhost:3000/api/books';
  readonly wsBaseUrl = 'ws://localhost:3000/ws';
  readonly httpClient = inject(HttpClient);

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

  #selectedBook = rxResource({
    params: () => ({ id: this.#selectedBookId() }),
    stream: (options) =>
      options.params.id
        ? this.httpClient.get<Book>(`${this.apiBaseUrl}/${options.params.id}`)
        : of(null),
    defaultValue: null,
  });

  #selectedStock = resource({
    params: () => ({ id: this.#selectedBookId() }),
    stream: async (options) => {
      const res = signal<ResourceStreamItem<number>>({ value: 0 });
      return res;
    },
  });

  get selectedBook() {
    return this.#selectedBook.asReadonly();
  }

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
