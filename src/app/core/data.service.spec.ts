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
