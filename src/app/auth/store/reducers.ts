import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './actions';
import { AuthStateInterface } from '../types/authState.interface';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  user: null,
  isAuthenticated: undefined,
  error: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.setUser, (state, { user }) => ({
      ...state,
      user,
      isAuthenticated: !!user,
      error: null
    })),
    on(authActions.clearUser, (state) => ({
      ...state,
      user: null,
      isAuthenticated: false,
      error: null
    })),
    on(authActions.loginFailure, (state, { message }) => ({
      ...state,
      user: null,
      isAuthenticated: false,
      error: message
    })),
    on(authActions.registerFailure, (state, { message }) => ({
      ...state,
      user: null,
      isAuthenticated: false,
      error: message
    })),

    on(routerNavigationAction, (state) => ({
      ...state,
      error: null
    }))
  )
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsAuthenticated,
  selectUser,
  selectError
} = authFeature;
