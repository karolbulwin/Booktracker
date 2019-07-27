import { Component, OnInit } from '@angular/core';
import { map, tap, flatMap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { DataService } from '../core/data.service';
import { Reader } from '../models/reader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: Book[];
  readers: Reader[];
  cards: Observable<object[]>;

  smallView(books: Book[], readers: Reader[]) {
    return [
      { title: 'Books', cols: 2, rows: 1, data: books },
      {
        title: 'Readers',
        cols: 2,
        rows: 1,
        data: readers
      },
      { title: 'Card 3', cols: 2, rows: 1 }
    ];
  }

  normalView(books: Book[], readers: Reader[]) {
    return [
      { title: 'Books', cols: 2, rows: 1, data: books },
      { title: 'Readers', cols: 1, rows: 1, data: readers },
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
        console.log(books);
        this.books = books;
        this.dataService.getReaders().subscribe(
          (readers: Reader[]) => {
            console.log(readers);
            this.readers = readers;

            this.cards = this.breakpointObserver
              .observe(Breakpoints.Handset)
              .pipe(
                map(({ matches }) => {
                  if (matches) {
                    return this.smallView(this.books, this.readers);
                  }
                  return this.normalView(this.books, this.readers);
                })
              );
          },
          (error: any) => console.log(error),
          () => console.log('hmm')
        );
      },
      (error: any) => console.log(error),
      () => console.log('Got them! or no?')
    );
  }
}
