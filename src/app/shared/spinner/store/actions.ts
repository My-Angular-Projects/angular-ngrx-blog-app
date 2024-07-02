import { createActionGroup, props } from '@ngrx/store';

export const spinnerActions = createActionGroup({
  source: 'spinner',
  events: {
    startSpinner: props<{ spinnerName: string }>(),
    stopSpinner: props<{ spinnerName: string }>(),
    addSpinner: props<{ spinnerName: string }>()
  }
});
