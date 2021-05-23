import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'progrendszerek-angular';
  isLoggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    private router: Router
  ) {}

  logout() {
    this.userService
      .logout()
      .pipe(first())
      .subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/auth']);
      });
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
}
