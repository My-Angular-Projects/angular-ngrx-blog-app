import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly DEFAULT_DURATION = 3000;
  private readonly snackBar = inject(MatSnackBar);

  public openSuccessToast(message: string): void {
    const config = {
      duration: this.DEFAULT_DURATION,
      panelClass: 'app-notification-success'
    } as MatSnackBarConfig;
    this.snackBar.open(message, undefined, config);
  }

  public openInfoToast(message: string): void {
    const config = {
      duration: this.DEFAULT_DURATION
    } as MatSnackBarConfig;
    this.snackBar.open(message, undefined, config);
  }
}
