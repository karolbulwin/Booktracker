import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';

import { DataService } from 'src/app/core/data.service';
import { Book } from 'src/app/models/book';
import { BookTrackerError } from 'src/app/models/bookTrackerError';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  bookForm;
  selectedBook: Book;
  error = {
    send: '',
    get: ''
  };
  isFavorite: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location
  ) {}

  getBook(): void {
    const bookID = +this.route.snapshot.params.id;

    this.dataService.getBook(bookID).subscribe(
      (book: Book) => {
        this.selectedBook = book;
        this.isFavorite = book.favorite;
        this.bookForm = this.fb.group({
          title: [this.selectedBook.title, Validators.required],
          author: [this.selectedBook.author, Validators.required],
          publicationYear: [
            this.selectedBook.publicationYear,
            Validators.required
          ]
        });
      },
      (error: BookTrackerError) => {
        this.error.get = error.friendlyMessage as string;
      }
    );
  }

  onSubmit(): void {
    if (this.bookForm.status === 'VALID') {
      const updatedBook: Book = this.bookForm.value as Book;
      updatedBook.favorite = this.isFavorite;
      const newBook = { ...this.selectedBook, ...updatedBook };

      this.dataService.updateBook(newBook).subscribe(
        (data: void) => console.log('Updated successfully.'),
        (error: BookTrackerError) => {
          // this.error = error.friendlyMessage as string;
          this.error.send = 'An error occurred. Please try again later.';
        },
        () => {
          if (!this.error.send) {
            this.goBack();
          }
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  onClickFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  ngOnInit(): void {
    this.getBook();
  }
}
