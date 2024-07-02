import { createFeature, createReducer, on } from '@ngrx/store';
import { addPostActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { AddPostStateInterface } from '../types/addPostState.interface';

const initialState: AddPostStateInterface = {
  error: null
};

const addPostFeature = createFeature({
  name: 'addPost',
  reducer: createReducer(
    initialState,
    on(addPostActions.addPost, (state) => ({
      ...state,
      error: null
    })),
    on(addPostActions.addPostFailure, (state, action) => ({
      ...state,
      error: action.message
    })),
    on(addPostActions.addPostSuccess, (state) => ({
      ...state,
      error: null
    })),

    on(routerNavigationAction, (state) => ({
      ...state,
      error: null
    }))
  )
});

export const {
  name: addPostFeatureKey,
  reducer: addPostReducer,
  selectError
} = addPostFeature;
