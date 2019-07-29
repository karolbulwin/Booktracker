import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { BookTrackerError } from '../models/bookTrackerError';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private booksUrl =
    'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books';
  private readersUrl =
    'https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers';

  // private booksUrl = 'api/books';
  // private readersUrl = 'api/readers';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  getBook(id: number): Observable<Book | BookTrackerError> {
    return this.http.get<Book>(`${this.booksUrl}/${id}`).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  addBook(newBook: Book): Observable<Book | BookTrackerError> {
    return this.http
      .post<Book>(this.booksUrl, newBook)
      .pipe(catchError(this.handleHttpError));
  }

  updateBook(updatedBook: Book): Observable<void | BookTrackerError> {
    return this.http
      .put<void>(`${this.booksUrl}/${updatedBook.id}`, updatedBook)
      .pipe(catchError(this.handleHttpError));
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`${this.booksUrl}/${bookID}`);
  }

  getReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>(this.readersUrl).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  getReader(id: number): Observable<Reader | BookTrackerError> {
    return this.http.get<Reader>(`${this.readersUrl}/${id}`).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  addReader(newReader: Reader): Observable<Reader | BookTrackerError> {
    return this.http
      .post<Reader>(this.readersUrl, newReader)
      .pipe(catchError(this.handleHttpError));
  }

  updateReader(updatedReader: Reader): Observable<void | BookTrackerError> {
    return this.http
      .put<void>(`${this.readersUrl}/${updatedReader.id}`, updatedReader)
      .pipe(catchError(this.handleHttpError));
  }

  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(`${this.readersUrl}/${readerID}`);
  }

  private handleHttpError(
    error: HttpErrorResponse
  ): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        // TODO: send the error to remote logging infrastructure
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error)}`
      );
      dataError.errorNumber = 100;
      dataError.message = error.statusText;
      dataError.friendlyMessage = 'An error occurred retrieving data.';
    }

    return throwError(dataError);
  }
}
