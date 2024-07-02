import { AfterViewInit, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from '../../store/actions';
import { selectHasMorePostsBackward, selectHasMorePostsForward, selectPage, selectPosts } from '../../store/reducers';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements AfterViewInit {
  public readonly store = inject(Store);
  public readonly spinnerName = 'feed-spinner';

  public readonly posts$ = this.store.select(selectPosts);
  public readonly page$ = this.store.select(selectPage);
  public readonly hasMorePostsForward$ = this.store.select(selectHasMorePostsForward);
  public readonly hasMorePostsBackward$ = this.store.select(selectHasMorePostsBackward);

  ngAfterViewInit(): void {
    this.store.dispatch(feedActions.getFeed({ spinnerName: this.spinnerName }));
  }

  public getNextPage(): void {
    this.store.dispatch(
      feedActions.getNextPage({ spinnerName: this.spinnerName })
    );
  }

  public getPreviousPage(): void {
    this.store.dispatch(
      feedActions.getPreviousPage({ spinnerName: this.spinnerName })
    );
  }
}
