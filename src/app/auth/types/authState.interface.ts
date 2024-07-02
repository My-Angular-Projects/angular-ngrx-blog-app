import { User } from '@angular/fire/auth';

export interface AuthStateInterface {
  user: User | null;
  isAuthenticated: boolean | undefined;
  error: string | null;
}
