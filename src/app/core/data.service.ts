import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/operators';

import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { BookTrackerError } from '../models/bookTrackerError';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private booksUrl =
  //   'https://my-json-server.typicode.com/karolbulwin/booktracker_db/books';
  // private readersUrl =
  //   'https://my-json-server.typicode.com/karolbulwin/booktracker_db/readers';

  private booksUrl = 'api/bookss';
  private readersUrl = 'api/readerss';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>(this.booksUrl, httpOptions).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  getBook(id: number): Observable<Book | BookTrackerError> {
    return this.http.get<Book>(`${this.booksUrl}/${id}`, httpOptions).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  addBook(newBook: Book): Observable<Book | BookTrackerError> {
    return this.http
      .post<Book>(this.booksUrl, newBook, httpOptions)
      .pipe(catchError(this.handleHttpError));
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http
      .put<void>(`${this.booksUrl}/${updatedBook.id}`, updatedBook, httpOptions)
      .pipe(
        tap(_ => this.log(`book added=${updatedBook.title}`)),
        catchError(
          this.handleError<void>(`updateBook -failed - ${updatedBook.title}`)
        )
      );
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
    return this.http.get<Reader>(`${this.readersUrl}/${id}`, httpOptions).pipe(
      retry(3),
      catchError(this.handleHttpError)
    );
  }

  addReader(newReader: Reader): Observable<Reader | BookTrackerError> {
    return this.http
      .post<Reader>(this.readersUrl, newReader, httpOptions)
      .pipe(catchError(this.handleHttpError));
  }

  updateReader(updatedReader: Reader): Observable<void> {
    return this.http
      .put<void>(
        `${this.readersUrl}/${updatedReader.id}`,
        updatedReader,
        httpOptions
      )
      .pipe(
        catchError(
          this.handleError<void>(`updateReader -failed - ${updatedReader.name}`)
        )
      );
  }

  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(`${this.readersUrl}/${readerID}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private handleHttpError(
    error: HttpErrorResponse
  ): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error)}`
      );
      dataError.errorNumber = 100;
      dataError.message = error.statusText;
      dataError.friendlyMessage = 'An error occurred retrieving data.';
    }

    return throwError(dataError);
  }

  private log(message: string) {
    console.log(`DataService: ${message}`);
  }
}
