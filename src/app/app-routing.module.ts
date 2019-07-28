import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { AddReaderComponent } from './readers/add-reader/add-reader.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addBook', component: AddBookComponent },
  { path: 'addReader', component: AddReaderComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
