import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  title = 'Book tracker';
  navItems = [
    { text: 'Home', path: '/dashboard' },
    { text: 'Add book', path: '/addBook' },
    { text: 'Add reader', path: '/addReader' }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
      // share()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
