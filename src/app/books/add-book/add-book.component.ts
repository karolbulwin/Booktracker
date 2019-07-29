import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/core/data.service';
import { BookTrackerError } from 'src/app/models/bookTrackerError';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm = this.fb.group({
    title: [null, Validators.required],
    author: [null, Validators.required],
    publicationYear: [null, Validators.required]
  });
  error: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.bookForm.status === 'VALID') {
      const newBook: Book = this.bookForm.value as Book;

      this.dataService.addBook(newBook).subscribe(
        (book: Book) => console.log(book),
        (error: BookTrackerError) => {
          // this.error = error.friendlyMessage as string;
          this.error = 'An error occurred. Please try again later.';
        },
        () => {
          if (!this.error) {
            this.goToHome();
          }
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToHome(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {}
}
