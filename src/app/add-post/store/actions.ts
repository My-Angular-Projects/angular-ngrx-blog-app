import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddPostRequestInterface } from '../types/addPostRequest.interface';

export const addPostActions = createActionGroup({
  source: 'addPost',
  events: {
    addPost: props<{ post: AddPostRequestInterface; spinnerName: string }>(),
    addPostSuccess: emptyProps(),
    addPostFailure: props<{ message: string }>()
  }
});
