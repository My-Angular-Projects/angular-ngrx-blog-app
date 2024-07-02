import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthRequestInterface } from '../types/authRequest.interface';
import { User } from '@angular/fire/auth';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    register: props<{ authData: AuthRequestInterface; spinnerName: string }>(),
    registerSuccess: emptyProps(),
    registerFailure: props<{ message: string }>(),

    login: props<{ authData: AuthRequestInterface; spinnerName: string }>(),
    loginSuccess: emptyProps(),
    loginFailure: props<{ message: string }>(),

    logout: emptyProps(),

    setUser: props<{ user: User }>(),
    clearUser: emptyProps()
  }
});
