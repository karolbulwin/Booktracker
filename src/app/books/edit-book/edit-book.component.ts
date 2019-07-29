import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { BookTrackerError } from 'src/app/models/bookTrackerError';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  // bookForm = this.fb.group({
  //   title: [this.selectedBook.title, Validators.required],
  //   author: [this.selectedBook.author, Validators.required],
  //   publicationYear: [null, Validators.required]
  // });

  //   new FormControl('', [Validators.required, Validators.email]);
  bookForm;
  selectedBook: Book;
  error = {
    send: '',
    get: ''
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location
  ) {}

  // getErrorMessage() {
  //   return this.year.hasError('required')
  //     ? 'You must enter a value'
  //     : this.year.hasError('email')
  //     ? 'Not a valid email'
  //     : '';
  // }

  getBook(): void {
    const bookID = +this.route.snapshot.params.id;

    this.dataService.getBook(bookID).subscribe(
      (book: Book) => {
        this.selectedBook = book;
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
    console.warn('Saved');

    if (this.bookForm.status === 'VALID') {
      const updatedBook: Book = this.bookForm.value as Book;
      const newBook = { ...this.selectedBook, ...updatedBook };

      this.dataService.updateBook(newBook).subscribe(
        (data: void) =>
          console.log(`${this.selectedBook.title} updated successfully`),
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

  ngOnInit(): void {
    this.getBook();
  }
}
