import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { withSpinner } from 'src/app/shared/spinner/operators/with-spinner.operator';
import { FeedService } from '../services/feed.service';
import { feedActions } from './actions';
import {
  selectFirstPost,
  selectHasMorePostsBackward,
  selectHasMorePostsForward,
  selectInitialCursorId,
  selectLastPost
} from './reducers';

export const getFeedEffect = createEffect(
  (
    store = inject(Store),
    actions$ = inject(Actions),
    feedService = inject(FeedService)
  ) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ spinnerName }) => {
        return feedService.getFeed(null).pipe(
          withSpinner(spinnerName, store),
          tap((posts) => {
            store.dispatch(
              feedActions.storeInitialCursorId({ cursor: posts[0]?.id })
            );
          }),
          map((posts) =>
            feedActions.getFeedSuccess({
              posts,
              hasMorePostsForward: posts.length === 5,
              hasMorePostsBackward: false
            })
          ),
          catchError((error: HttpErrorResponse) => {
            return of(feedActions.getFeedFailure({ message: error.message }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const getNextPageEffect = createEffect(
  (
    store = inject(Store),
    actions$ = inject(Actions),
    feedService = inject(FeedService)
  ) => {
    return actions$.pipe(
      ofType(feedActions.getNextPage),
      withLatestFrom(
        store.pipe(select(selectLastPost)),
        store.pipe(select(selectHasMorePostsForward))
      ),
      switchMap(([{ spinnerName }, cursor, hasMoreForward]) => {
        if (hasMoreForward) {
          return feedService.getFeed(cursor).pipe(
            withSpinner(spinnerName, store),
            map((posts) =>
              feedActions.getFeedSuccess({
                posts,
                hasMorePostsForward: posts.length === 5,
                hasMorePostsBackward: true
              })
            ),
            catchError((error: HttpErrorResponse) => {
              return of(feedActions.getFeedFailure({ message: error.message }));
            })
          );
        } else {
          return of();
        }
      })
    );
  },
  { functional: true }
);

export const getPreviousPageEffect = createEffect(
  (
    store = inject(Store),
    actions$ = inject(Actions),
    feedService = inject(FeedService)
  ) => {
    return actions$.pipe(
      ofType(feedActions.getPreviousPage),
      withLatestFrom(
        store.pipe(select(selectInitialCursorId)),
        store.pipe(select(selectFirstPost)),
        store.pipe(select(selectHasMorePostsBackward))
      ),
      switchMap(
        ([{ spinnerName }, initialCursor, cursor, hasMorePostsBackward]) => {
          if (
            hasMorePostsBackward &&
            initialCursor &&
            cursor?.id !== initialCursor
          ) {
            return feedService.getFeed(cursor, undefined, true).pipe(
              withSpinner(spinnerName, store),
              map((posts) =>
                feedActions.getFeedSuccess({
                  posts,
                  hasMorePostsForward: posts.length === 5,
                  hasMorePostsBackward: posts[0].id != initialCursor
                })
              ),
              catchError((error: HttpErrorResponse) => {
                return of(feedActions.getFeedFailure({ message: error.message }));
              })
            );
          } else {
            return of();
          }
        }
      )
    );
  },
  { functional: true }
);

export const getFeedSuccess = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(ofType(feedActions.getFeedSuccess));
  },
  { functional: true, dispatch: false }
);

export const getFeedFailure = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(ofType(feedActions.getFeedFailure));
  },
  { functional: true, dispatch: false }
);
