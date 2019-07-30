import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Book } from '../models/book';
import { books } from '../data';

describe('DataService', () => {
  let dataServive: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    dataServive = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should GET all books', () => {
    dataServive.getBooks().subscribe((data: Book[]) => {
      expect(data.length).toBe(6);
    });

    const booksRequest: TestRequest = httpTestingController.expectOne(
      'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books'
      // '/api/books'
    );
    expect(booksRequest.request.method).toBe('GET');

    booksRequest.flush(books);

    httpTestingController.verify();
  });
});
