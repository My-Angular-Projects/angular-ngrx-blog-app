import { AfterViewInit, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from './auth/store/reducers';
import { AuthService } from './auth/services/auth.service';
import { authActions } from './auth/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  public readonly user$ = this.store.select(selectUser);
  public readonly spinnerName = 'app-spinner';
  public readonly title = 'BlogApp';

  ngAfterViewInit(): void {
    this.authService.initAuthListener(this.spinnerName);
  }

  public logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
