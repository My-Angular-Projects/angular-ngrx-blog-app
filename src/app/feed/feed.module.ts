import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { SharedModule } from '../shared/shared.module';
import { FeedRoutingModule } from './feed-routing.module';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { feedFeatureKey, feedReducer } from './store/reducers';
import * as feedEffects from './store/effects';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, SharedModule, FeedRoutingModule],
  providers: [
    provideState(feedFeatureKey, feedReducer),
    provideEffects(feedEffects)
  ]
})
export class FeedModule {
}
