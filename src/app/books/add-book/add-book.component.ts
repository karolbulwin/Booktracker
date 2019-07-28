import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Book } from 'src/app/models/book';
// import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/core/data.service';
import { Router } from '@angular/router';

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

  //   new FormControl('', [Validators.required, Validators.email]);
  // newBook: Book = <Book>this.bookForm;

  constructor(
    // private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.bookForm.status === 'VALID') {
      const newBook: Book = this.bookForm.value as Book;
      // newBook.id = 0;

      console.log(newBook);
      console.log(this.bookForm.value);

      this.dataService.addBook(newBook).subscribe(
        (book: Book) => console.log(book),
        (err: any) => console.log('add-book: ' + err), // in dataService
        () => this.goToHome()
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
