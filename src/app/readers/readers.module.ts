import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AddReaderComponent, EditReaderComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class ReadersModule {}
