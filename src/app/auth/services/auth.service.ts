import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
  UserCredential
} from '@angular/fire/auth';
import { AuthRequestInterface } from '../types/authRequest.interface';
import { from, Observable, skip, take } from 'rxjs';
import { User } from 'firebase/auth';
import { Store } from '@ngrx/store';
import { authActions } from '../store/actions';
import { withSpinner } from 'src/app/shared/spinner/operators/with-spinner.operator';

@Injectable()
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly store = inject(Store);

  public register(authData: AuthRequestInterface): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        authData.email,
        authData.password
      )
    );
  }

  public login(authData: AuthRequestInterface): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, authData.email, authData.password)
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  public initAuthListener(spinnerName: string): void {
    user(this.auth)
      .pipe(take(1), withSpinner(spinnerName, this.store))
      .subscribe((user: User | null) => {
        this.handleUserState(user);
        this.continueAuthListener();
      });
  }

  private continueAuthListener(): void {
    user(this.auth)
      .pipe(skip(1))
      .subscribe((user: User | null) => {
        this.handleUserState(user);
      });
  }

  private handleUserState(user: User | null): void {
    if (user) {
      this.store.dispatch(
        authActions.setUser({ user: JSON.parse(JSON.stringify(user)) })
      );
    } else {
      this.store.dispatch(authActions.clearUser());
    }
  }
}
