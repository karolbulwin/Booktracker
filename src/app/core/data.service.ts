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

  private booksUrl = 'api/books';
  private readersUrl = 'api/readers';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>(this.booksUrl, httpOptions).pipe(
      tap(_ => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
      // catchError(err => this.handleHttpError(err))
    );
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${id}`, httpOptions).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, newBook, httpOptions).pipe(
      tap(_ => this.log(`book added=${newBook.title}`)),
      catchError(this.handleError<Book>(`addBook -failed - ${newBook.title}`))
    );
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
      tap(_ => this.log('fetched readers')),
      // catchError(this.handleError<Reader[]>('getReaders', []))
      retry(3),
      catchError(err => this.handleHttpError(err))
    );
  }

  getReader(id: number): Observable<Reader> {
    const url = `${this.readersUrl}/${id}`;

    console.log(url);
    return this.http.get<Reader>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched reader id=${id}`)),
      catchError(this.handleError<Reader>(`getReader id=${id}`))
    );
  }

  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>(this.readersUrl, newReader, httpOptions).pipe(
      tap(_ => this.log(`reader added=${newReader.name}`)),
      catchError(
        this.handleError<Reader>(`addReader -failed - ${newReader.name}`)
      )
    );
  }

  updateReader(updatedReader: Reader): Observable<void> {
    return this.http
      .put<void>(
        `${this.readersUrl}/${updatedReader.id}`,
        updatedReader,
        httpOptions
      )
      .pipe(
        tap(_ => this.log(`reader added=${updatedReader.name}`)),
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
