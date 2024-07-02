import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SpinnerComponent } from './spinner/components/spinner.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, SpinnerComponent],
  declarations: [SpinnerComponent]
})
export class SharedModule {
}
