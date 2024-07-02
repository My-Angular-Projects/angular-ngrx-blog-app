import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRequestInterface } from '../../types/authRequest.interface';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { selectError } from '../../store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly store = inject(Store);
  public readonly error$ = this.store.select(selectError);
  public readonly spinnerName = 'login-spinner';

  public loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  public onSubmit(): void {
    const authData: AuthRequestInterface = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    };
    this.store.dispatch(
      authActions.login({ authData: authData, spinnerName: this.spinnerName })
    );
  }
}
