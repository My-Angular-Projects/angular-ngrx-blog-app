import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { withSpinner } from 'src/app/shared/spinner/operators/with-spinner.operator';
import { AddPostService } from '../services/add-post.service';
import { addPostActions } from './actions';
import { selectUser } from 'src/app/auth/store/reducers';
import { ToastService } from 'src/app/shared/toast/services/toast.service';
import { AddPostRequestInterface } from '../types/addPostRequest.interface';

export const addPostEffect = createEffect(
  (
    store = inject(Store),
    actions$ = inject(Actions),
    addPostService = inject(AddPostService)
  ) => {
    return actions$.pipe(
      ofType(addPostActions.addPost),
      withLatestFrom(store.select(selectUser)),
      switchMap(([action, user]) => {
        const { post, spinnerName } = action;
        if (!user || !user.uid) {
          return of(
            addPostActions.addPostFailure({ message: 'User ID is missing' })
          );
        }
        return addPostService
          .addPost({
            ...post,
            userId: user.uid,
            userEmail: user.email ?? '',
            createdAt: new Date()
          } as AddPostRequestInterface)
          .pipe(
            withSpinner(spinnerName, store),
            map(() => addPostActions.addPostSuccess()),
            catchError((error: HttpErrorResponse) =>
              of(addPostActions.addPostFailure({ message: error.message }))
            )
          );
      })
    );
  },
  { functional: true }
);

export const addPostSuccessEffect = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) => {
    return actions$.pipe(
      ofType(addPostActions.addPostSuccess),
      tap(() => {
        toastService.openSuccessToast('PostInterface added successfully');
      })
    );
  },
  { functional: true, dispatch: false }
);
