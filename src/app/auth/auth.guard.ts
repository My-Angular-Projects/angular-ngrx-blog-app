import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './store/reducers';
import { filter, take } from 'rxjs';

export const AuthGuard = () => {
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    filter((authenticated) => authenticated !== undefined),
    take(1)
  );
};
