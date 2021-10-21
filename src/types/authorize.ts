import { ReactNode } from 'react';
import { User } from './user';

export interface IAuthResponse {
  token: string;
  user: User;
}

export interface IAuthContextData {
  user: User | null;
  signInUrl: string;
  signOut: () => Promise<void>;
}

export interface IAuthProvider {
  children: ReactNode;
}
