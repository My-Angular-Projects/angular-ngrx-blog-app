import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthModule as FireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    FireAuthModule,
    SharedModule
  ]
})
export class AuthModule {
}
