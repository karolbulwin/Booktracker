import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Book } from '../models/book';
import { DataService } from '../core/data.service';
import { Reader } from '../models/reader';
import { BookTrackerError } from '../models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: Book[];
  readers: Reader[];
  errors = {
    books: '',
    readers: ''
  };

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.smallView();
      }
      return this.normalView();
    })
  );

  smallView() {
    return [
      { title: 'Books', cols: 2, rows: 1 },
      {
        title: 'Readers',
        cols: 2,
        rows: 1
      },
      { title: 'Card 3', cols: 2, rows: 1 }
    ];
  }

  normalView() {
    return [
      { title: 'Books', cols: 2, rows: 1 },
      { title: 'Readers', cols: 1, rows: 1 },
      { title: 'Card 3', cols: 1, rows: 1 }
    ];
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error: BookTrackerError) => {
        this.errors.books = error.friendlyMessage as string;
      }
    );
    this.dataService.getReaders().subscribe(
      (readers: Reader[]) => {
        this.readers = readers;
      },
      (error: BookTrackerError) => {
        this.errors.readers = error.friendlyMessage as string;
      }
    );
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe(
      (data: void) => {
        this.books = this.books.filter(book => book.id !== bookID);
        console.log(this.books);
      },
      (err: any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    this.dataService.deleteReader(readerID).subscribe(
      (data: void) => {
        this.readers = this.readers.filter(reader => reader.id !== readerID);
        console.log(this.readers);
      },
      (err: any) => console.log(err)
    );
  }
}
