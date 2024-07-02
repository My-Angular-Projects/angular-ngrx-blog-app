import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSpinnerState } from '../store/selectors';
import { spinnerActions } from '../store/actions';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  private readonly store = inject(Store);

  @Input()
  spinnerName!: string;

  @Input()
  fullscreen = true;

  public readonly spinner$ = this.store.select(getSpinnerState(this.spinnerName));

  ngOnInit() {
    this.store.dispatch(
      spinnerActions.addSpinner({ spinnerName: this.spinnerName })
    );
  }
}
