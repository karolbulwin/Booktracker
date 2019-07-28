import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBookComponent } from './edit-book/edit-book.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EditBookComponent, AddBookComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: []
})
export class BooksModule {}
