import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { Reader } from 'src/app/models/reader';
// import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss']
})
export class AddReaderComponent implements OnInit {
  readerForm = this.fb.group({
    name: [null, Validators.required],
    weeklyReadingGoal: [null, Validators.required],
    totalMinutesRead: [null, Validators.required]
  });

  constructor(
    // private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private location: Location,
    private router: Router
  ) {}

  // getErrorMessage() {
  //   return this.year.hasError('required')
  //     ? 'You must enter a value'
  //     : this.year.hasError('email')
  //     ? 'Not a valid email'
  //     : '';
  // }

  onSubmit(): void {
    if (this.readerForm.status === 'VALID') {
      const newReader: Reader = this.readerForm.value as Reader;
      // newReader.id = 0;

      console.log(newReader);
      console.log(this.readerForm.value);

      this.dataService.addReader(newReader).subscribe(
        (reader: Reader) => console.log(reader),
        (err: any) => console.log('add-reader: ' + err), // in dataService
        () => this.goToHome()
      );
    }
  }

  goToHome(): void {
    this.router.navigate(['/dashboard']);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {}
}
