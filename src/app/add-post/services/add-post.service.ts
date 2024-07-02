import { inject, Injectable } from '@angular/core';
import { AddPostRequestInterface } from '../types/addPostRequest.interface';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly postsCollection: CollectionReference = collection(
    this.firestore,
    'posts'
  );

  public addPost(post: AddPostRequestInterface): Observable<any> {
    return from(addDoc(this.postsCollection, post));
  }
}
