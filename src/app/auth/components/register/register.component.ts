import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { AuthRequestInterface } from '../../types/authRequest.interface';
import { selectError } from '../../store/reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly store = inject(Store);

  public readonly error$ = this.store.select(selectError);
  public readonly spinnerName = 'register-spinner';

  public registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  public onSubmit(): void {
    const authData: AuthRequestInterface = {
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.get('password')?.value!
    };
    this.store.dispatch(
      authActions.register({ authData, spinnerName: this.spinnerName })
    );
  }
}
