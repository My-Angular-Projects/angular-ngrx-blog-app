import { createActionGroup, props } from '@ngrx/store';
import { PostInterface } from '../types/post.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    getFeed: props<{ spinnerName: string }>(),
    getNextPage: props<{ spinnerName: string }>(),
    getPreviousPage: props<{ spinnerName: string }>(),
    getFeedSuccess: props<{
      posts: PostInterface[]
      hasMorePostsForward: boolean
      hasMorePostsBackward: boolean
    }>(),
    getFeedFailure: props<{ message: string }>(),
    storeInitialCursorId: props<{ cursor: string | null }>()
  }
});
