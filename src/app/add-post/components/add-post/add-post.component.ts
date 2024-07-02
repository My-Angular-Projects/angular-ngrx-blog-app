import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addPostActions } from '../../store/actions';
import { AddPostRequestInterface } from '../../types/addPostRequest.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  private readonly store = inject(Store);
  public readonly spinnerName = 'add-post-spinner';

  public postForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required]
    }),
    content: new FormControl('', { validators: [Validators.required] })
  });

  public addPost(): void {
    const post = this.postForm.getRawValue() as AddPostRequestInterface;
    this.store.dispatch(
      addPostActions.addPost({ post, spinnerName: this.spinnerName })
    );
  }
}
