import { createFeature, createReducer, on } from '@ngrx/store';
import { SpinnerStateInterface } from '../../types/spinnerState.interface';
import { spinnerActions } from './actions';

const initialState: SpinnerStateInterface = {};

const spinnerFeature = createFeature({
  name: 'spinner',
  reducer: createReducer(
    initialState,
    on(spinnerActions.startSpinner, (state, { spinnerName }) => ({
      ...state,
      [spinnerName]: true
    })),
    on(spinnerActions.stopSpinner, (state, { spinnerName }) => ({
      ...state,
      [spinnerName]: false
    })),
    on(spinnerActions.addSpinner, (state, { spinnerName }) => ({
      ...state,
      [spinnerName]: false
    }))
  )
});

export const {
  name: spinnerFeatureKey,
  reducer: spinnerReducer,
  selectSpinnerState
} = spinnerFeature;
