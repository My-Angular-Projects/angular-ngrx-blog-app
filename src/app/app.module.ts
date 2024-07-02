import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideState, provideStore } from '@ngrx/store';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { spinnerFeatureKey, spinnerReducer } from './shared/spinner/store/reducers';
import { SharedModule } from './shared/shared.module';
import { FeedModule } from './feed/feed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    FeedModule
  ],
  providers: [
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(spinnerFeatureKey, spinnerReducer),
    provideEffects(authEffects),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
