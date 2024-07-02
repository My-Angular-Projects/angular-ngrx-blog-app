import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'add-post',
    loadChildren: () =>
      import('./add-post/add-post.module').then((m) => m.AddPostModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then((m) => m.FeedModule),
    canActivate: [() => true],
    canMatch: [() => true]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
