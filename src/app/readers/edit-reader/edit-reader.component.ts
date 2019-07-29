import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { Reader } from 'src/app/models/reader';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { BookTrackerError } from 'src/app/models/bookTrackerError';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styleUrls: ['./edit-reader.component.scss']
})
export class EditReaderComponent implements OnInit {
  readerForm;
  selectedReader: Reader;
  error: string;

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

  getReader(): void {
    const readerID = +this.route.snapshot.params.id;

    this.dataService.getReader(readerID).subscribe(
      (reader: Reader) => {
        this.selectedReader = reader;
        this.readerForm = this.fb.group({
          name: [this.selectedReader.name, Validators.required],
          weeklyReadingGoal: [
            this.selectedReader.weeklyReadingGoal,
            Validators.required
          ],
          totalMinutesRead: [
            this.selectedReader.totalMinutesRead,
            Validators.required
          ]
        });
      },
      (error: BookTrackerError) => {
        this.error = error.friendlyMessage as string;
      }
    );
  }

  onSubmit(): void {
    console.warn('Saved');

    if (this.readerForm.status === 'VALID') {
      const updatedReader: Reader = this.readerForm.value as Reader;
      const newReader = { ...this.selectedReader, ...updatedReader };

      this.dataService
        .updateReader(newReader)
        .subscribe(
          (data: void) =>
            console.log(`${this.selectedReader.name} updated successfully`),
          (err: any) => console.log(err),
          () => this.goBack()
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getReader();
  }
}
