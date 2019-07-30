import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Book } from '../models/book';
import { Reader } from '../models/reader';

import { books, readers } from '../data';
import { BookTrackerError } from '../models/bookTrackerError';

describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should GET all books', () => {
    dataService.getBooks().subscribe((data: Book[]) => {
      expect(data.length).toBe(6);
    });

    const booksRequest: TestRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books'
      // '/api/books'
    );
    expect(booksRequest.request.method).toEqual('GET');

    booksRequest.flush(books);
  });

  it('should GET second book', () => {
    const bookId = books[2].id;
    dataService.getBook(bookId).subscribe((data: Book) => {
      expect(data).toEqual(books[bookId]);
    });

    const booksRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/books/${bookId}`
      // '/api/books'
    );
    expect(booksRequest.request.method).toEqual('GET');

    booksRequest.flush(books[bookId]);
  });

  it('should GET all readers', () => {
    dataService.getReaders().subscribe((data: Reader[]) => {
      expect(data.length).toBe(3);
    });

    const readersRequest: TestRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers'
      // '/api/readers'
    );
    expect(readersRequest.request.method).toEqual('GET');

    readersRequest.flush(readers);
  });

  it('should GET first reader', () => {
    const readerId = readers[1].id;
    dataService.getReader(readerId).subscribe((data: Reader) => {
      expect(data).toEqual(readers[readerId]);
    });

    const readersRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers/${readerId}`
      // '/api/readers'
    );
    expect(readersRequest.request.method).toEqual('GET');

    readersRequest.flush(readers[readerId]);
  });

  it('should add new book', () => {
    const newBook: Book = {
      id: null,
      title: 'ME',
      author: 'I',
      publicationYear: 2019
    };
    dataService.addBook(newBook).subscribe((data: Book) => {
      expect(data).toEqual(newBook);
    });

    const booksRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/books`
      // '/api/books'
    );
    expect(booksRequest.request.method).toEqual('POST');

    booksRequest.flush(newBook);
  });

  it('should add new reader', () => {
    const newReader: Reader = {
      id: null,
      name: 'Karol',
      weeklyReadingGoal: 100,
      totalMinutesRead: 100
    };

    dataService.addReader(newReader).subscribe((data: Reader) => {
      expect(data).toEqual(newReader);
    });

    const readersRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers`
      // '/api/readers'
    );
    expect(readersRequest.request.method).toEqual('POST');

    readersRequest.flush(newReader);
  });

  it('should delete book', () => {
    const bookToDelete = books[1];
    dataService.deleteBook(bookToDelete.id).subscribe(data => {
      expect(data).toEqual(null);
    });

    const booksRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/books/${
        bookToDelete.id
      }`
      // '/api/books'
    );
    expect(booksRequest.request.method).toEqual('DELETE');

    booksRequest.flush(null);
  });

  it('should delete reader', () => {
    const readerToDelete = readers[1];
    dataService.deleteReader(readerToDelete.id).subscribe(data => {
      expect(null).toEqual(null);
    });

    const readersRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers/${
        readerToDelete.id
      }`
      // '/api/readers'
    );
    expect(readersRequest.request.method).toEqual('DELETE');

    readersRequest.flush(null);
  });

  it('should update book', () => {
    const updatedBook = { ...books[1] };
    updatedBook.title = 'ME';
    console.log('updatedBook::::', updatedBook);

    dataService.updateBook(updatedBook).subscribe(data => {
      expect(data).toEqual(null);
    });

    const readersRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/books/${
        updatedBook.id
      }`
      // '/api/books'
    );
    expect(readersRequest.request.method).toEqual('PUT');

    readersRequest.flush(null);
  });

  it('should update reader', () => {
    const updatedReader = { ...readers[1] };
    updatedReader.name = 'Karol';

    dataService.updateReader(updatedReader).subscribe(data => {
      expect(data).toEqual(null);
    });

    const readersRequest: TestRequest = httpTestingController.expectOne(
      `https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers/${
        updatedReader.id
      }`
      // '/api/readers'
    );
    expect(readersRequest.request.method).toEqual('PUT');

    readersRequest.flush(null);
  });

  // it('should return a BookTrackerError', () => {
  //   dataService.getBooks().subscribe(
  //     (data: Book[]) => fail('this should have been an error'),
  //     (error: BookTrackerError) => {
  //       expect(error.errorNumber).toEqual(100);
  //       expect(error.friendlyMessage).toEqual(
  //         'An error occurred retrieving data.'
  //       );
  //     }
  //   );

  //   const booksRequest: TestRequest = httpTestingController.expectOne(
  //     'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books'
  //     // '/api/books'
  //   );
  //   // expect(booksRequest.request.method).toEqual('GET');

  //   booksRequest.flush('error', {
  //     status: 500,
  //     statusText: 'Server Error'
  //   });
  // });
});
