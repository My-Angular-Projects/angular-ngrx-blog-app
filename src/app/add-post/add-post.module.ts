import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddPostRoutingModule } from './add-post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { addPostFeatureKey, addPostReducer } from './store/reducers';
import * as addPostEffects from './store/effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddPostComponent],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    provideState(addPostFeatureKey, addPostReducer),
    provideEffects(addPostEffects)
  ]
})
export class AddPostModule {
}
