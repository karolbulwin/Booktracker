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

  // const booksUrl = 'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books'
  // const readersUrl = 'https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers';

  const booksUrl = 'api/books';
  const readersUrl = 'api/readers';

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

  describe('getBooks method', () => {
    it('should GET all books', () => {
      dataService.getBooks().subscribe((data: Book[]) => {
        expect(data.length).toBe(6);
      });

      const booksRequest: TestRequest = httpTestingController.expectOne(
        `${booksUrl}`
      );
      expect(booksRequest.request.method).toEqual('GET');

      booksRequest.flush(books);
    });
  });

  describe('getBook method', () => {
    it('should GET second book', () => {
      const bookId = books[2].id;
      dataService.getBook(bookId).subscribe((data: Book) => {
        expect(data).toEqual(books[bookId]);
      });

      const booksRequest: TestRequest = httpTestingController.expectOne(
        `${booksUrl}/${bookId}`
      );
      expect(booksRequest.request.method).toEqual('GET');

      booksRequest.flush(books[bookId]);
    });
  });

  describe('getReaders method', () => {
    it('should GET all readers', () => {
      dataService.getReaders().subscribe((data: Reader[]) => {
        expect(data.length).toBe(3);
      });

      const readersRequest: TestRequest = httpTestingController.expectOne(
        `${readersUrl}`
      );
      expect(readersRequest.request.method).toEqual('GET');

      readersRequest.flush(readers);
    });
  });

  describe('getReader method', () => {
    it('should GET first reader', () => {
      const readerId = readers[1].id;
      dataService.getReader(readerId).subscribe((data: Reader) => {
        expect(data).toEqual(readers[readerId]);
      });

      const readersRequest: TestRequest = httpTestingController.expectOne(
        `${readersUrl}/${readerId}`
      );
      expect(readersRequest.request.method).toEqual('GET');

      readersRequest.flush(readers[readerId]);
    });
  });

  describe('addBook method', () => {
    it('should add new book', () => {
      const newBook: Book = {
        id: null,
        title: 'ME',
        author: 'I',
        publicationYear: 2019,
        favorite: false
      };
      dataService.addBook(newBook).subscribe((data: Book) => {
        expect(data).toEqual(newBook);
      });

      const booksRequest: TestRequest = httpTestingController.expectOne(
        `${booksUrl}`
      );
      expect(booksRequest.request.method).toEqual('POST');

      booksRequest.flush(newBook);
    });
  });

  describe('addReader method', () => {
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
        `${readersUrl}`
      );
      expect(readersRequest.request.method).toEqual('POST');

      readersRequest.flush(newReader);
    });
  });

  describe('deleteBook method', () => {
    it('should delete book', () => {
      const bookToDelete = books[1];
      dataService.deleteBook(bookToDelete.id).subscribe(data => {
        expect(data).toEqual(null);
      });

      const booksRequest: TestRequest = httpTestingController.expectOne(
        `${booksUrl}/${bookToDelete.id}`
      );
      expect(booksRequest.request.method).toEqual('DELETE');

      booksRequest.flush(null);
    });
  });

  describe('deleteReader method', () => {
    it('should delete reader', () => {
      const readerToDelete = readers[1];
      dataService.deleteReader(readerToDelete.id).subscribe(data => {
        expect(null).toEqual(null);
      });

      const readersRequest: TestRequest = httpTestingController.expectOne(
        `${readersUrl}/${readerToDelete.id}`
      );
      expect(readersRequest.request.method).toEqual('DELETE');

      readersRequest.flush(null);
    });
  });

  describe('updateBook method', () => {
    it('should update book', () => {
      const updatedBook = { ...books[1] };
      updatedBook.title = 'ME';
      console.log('updatedBook::::', updatedBook);

      dataService.updateBook(updatedBook).subscribe(data => {
        expect(data).toEqual(null);
      });

      const readersRequest: TestRequest = httpTestingController.expectOne(
        `${booksUrl}/${updatedBook.id}`
      );
      expect(readersRequest.request.method).toEqual('PUT');

      readersRequest.flush(null);
    });
  });

  describe('updateReader method', () => {
    it('should update reader', () => {
      const updatedReader = { ...readers[1] };
      updatedReader.name = 'Karol';

      dataService.updateReader(updatedReader).subscribe(data => {
        expect(data).toEqual(null);
      });

      const readersRequest: TestRequest = httpTestingController.expectOne(
        `${readersUrl}/${updatedReader.id}`
      );
      expect(readersRequest.request.method).toEqual('PUT');

      readersRequest.flush(null);
    });
  });

  // describe('handleHttpError metod', () => {
  //   it('should return a BookTrackerError', () => {
  //     dataService.getBooks().subscribe(
  //       (data: Book[]) => fail('this should have been an error'),
  //       (error: BookTrackerError) => {
  //         expect(error.errorNumber).toEqual(100);
  //         expect(error.friendlyMessage).toEqual(
  //           'An error occurred retrieving data.'
  //         );
  //       }
  //     );

  //     const booksRequest: TestRequest = httpTestingController.expectOne(
  //       'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books'
  //       // `${booksUrl}`
  //     );
  //     // expect(booksRequest.request.method).toEqual('GET');

  //     booksRequest.flush('error', {
  //       status: 500,
  //       statusText: 'Server Error'
  //     });
  //   });
  // });
});
