import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EditBookComponent } from '../books/edit-book/edit-book.component';
import { EditReaderComponent } from '../readers/edit-reader/edit-reader.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'editBook/:id', component: EditBookComponent },
  { path: 'editReader/:id', component: EditReaderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
