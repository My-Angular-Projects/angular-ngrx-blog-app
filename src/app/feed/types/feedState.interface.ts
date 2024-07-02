import { PostInterface } from './post.interface';

export interface FeedStateInterface {
  posts: PostInterface[] | null;
  error: string | null;
  hasMorePostsForward: boolean;
  hasMorePostsBackward: boolean;
  initialCursorId: string | null;
  page: number;
}
