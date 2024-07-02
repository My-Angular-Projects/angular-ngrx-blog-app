import { createSelector } from '@ngrx/store';
import { selectSpinnerState } from './reducers';

export const getSpinnerState = (spinnerName: string) =>
  createSelector(selectSpinnerState, (spinner) => {
    return spinner[spinnerName];
  });
