import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';
import { feedActions } from './actions';
import { PostInterface } from '../types/post.interface';

const initialState: FeedStateInterface = {
  posts: null,
  error: null,
  hasMorePostsForward: true,
  hasMorePostsBackward: false,
  initialCursorId: null,
  page: 1
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({
      ...state
    })),
    on(feedActions.getFeedSuccess, (state, action) => ({
      ...state,
      posts: action.posts,
      error: null,
      hasMorePostsForward: action.hasMorePostsForward,
      hasMorePostsBackward: action.hasMorePostsBackward
    })),
    on(feedActions.getFeedFailure, (state, action) => ({
      ...state,
      posts: null,
      error: action.message,
      hasMorePostsForward: false,
      hasMorePostsBackward: false
    })),
    on(feedActions.getNextPage, (state) => ({
      ...state,
      page: state.page + 1
    })),
    on(feedActions.getPreviousPage, (state) => ({
      ...state,
      page: state.page - 1
    })),
    on(feedActions.storeInitialCursorId, (state, action) => ({
      ...state,
      initialCursorId: action.cursor
    }))
  )
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectPosts,
  selectError,
  selectHasMorePostsForward,
  selectHasMorePostsBackward,
  selectInitialCursorId,
  selectPage
} = feedFeature;

export const selectLastPost = createSelector(selectPosts, (posts): PostInterface | null => {
  return posts && posts.length > 0 ? posts[posts.length - 1] : null;
});

export const selectFirstPost = createSelector(selectPosts, (posts): PostInterface | null => {
  return posts && posts.length > 0 ? posts[0] : null;
});
