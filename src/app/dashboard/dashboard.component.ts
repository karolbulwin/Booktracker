import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: Book[];
  cards: Observable<object[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
          map(({ matches }) => {
            if (matches) {
              return [
                { title: 'Books', cols: 2, rows: 1, data: this.books },
                { title: 'Card 2', cols: 2, rows: 1 },
                { title: 'Card 3', cols: 2, rows: 1 }
              ];
            }

            return [
              { title: 'Books', cols: 2, rows: 1, data: this.books },
              { title: 'Card 2', cols: 1, rows: 1 },
              { title: 'Card 3', cols: 1, rows: 1 }
            ];
          })
        );
      },
      (error: any) => console.log(error),
      () => console.log("Got'em!")
    );
  }
}
