import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import {
  collection,
  collectionData,
  DocumentData,
  endBefore,
  Firestore,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAfter
} from '@angular/fire/firestore';
import { PostInterface } from '../types/post.interface';
import { limitToLast } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly firestore = inject(Firestore);

  public getFeed(
    cursor: DocumentData | null = null,
    pageSize = 5,
    backward = false
  ): Observable<PostInterface[]> {
    const q = this.createQuery(cursor, pageSize, backward);
    return collectionData(q, {
      idField: 'id'
    }).pipe(
      take(1),
      map((documents: DocumentData[]) =>
        documents.map((doc: DocumentData) => this.mapDocumentToPost(doc))
      )
    );
  }

  private createQuery(
    cursor: DocumentData | null = null,
    pageSize: number = 5,
    backward: boolean = false
  ) {
    const queryConstraints = [orderBy('createdAt', 'desc')] as QueryConstraint[];
    if (cursor) {
      if (backward) {
        queryConstraints.push(endBefore(cursor['createdAt']));
        queryConstraints.push(limitToLast(pageSize));
      } else {
        queryConstraints.push(startAfter(cursor['createdAt']));
        queryConstraints.push(limit(pageSize));
      }
    } else {
      queryConstraints.push(limit(pageSize));
    }
    return query(collection(this.firestore, 'posts'), ...queryConstraints);
  }

  private mapDocumentToPost(doc: DocumentData): PostInterface {
    return {
      id: doc['id'],
      userId: doc['userId'],
      title: doc['title'],
      content: doc['content'],
      userEmail: doc['userEmail'],
      createdAt: doc['createdAt']
    };
  }
}
