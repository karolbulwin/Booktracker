import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './models/book';
import { Injectable } from '@angular/core';
import { Reader } from './models/reader';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books: Book[] = [
      {
        id: 1,
        title: 'Goodnight Moon',
        author: 'Margaret Wise Brown',
        publicationYear: 1953,
        favorite: false
      },
      {
        id: 2,
        title: 'Winnie-the-Pooh',
        author: 'A. A. Milne',
        publicationYear: 1926,
        favorite: false
      },
      {
        id: 3,
        title: 'Where the Wild Things Are',
        author: 'Maurice Sendak',
        publicationYear: 1963,
        favorite: false
      },
      {
        id: 4,
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        publicationYear: 1937,
        favorite: false
      },
      {
        id: 5,
        title: 'Curious George',
        author: 'H. A. Rey',
        publicationYear: 1941,
        favorite: false
      },
      {
        id: 6,
        title: "Alice's Adventures in Wonderland",
        author: 'Lewis Carroll',
        publicationYear: 1865,
        favorite: false
      }
    ];

    const readers: Reader[] = [
      {
        id: 1,
        name: 'Marie',
        weeklyReadingGoal: 400,
        totalMinutesRead: 5600
      },
      {
        id: 2,
        name: 'Daniel',
        weeklyReadingGoal: 210,
        totalMinutesRead: 3000
      },
      {
        id: 3,
        name: 'Lanier',
        weeklyReadingGoal: 140,
        totalMinutesRead: 600
      }
    ];

    return { books, readers };
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  }

  constructor() {}
}
