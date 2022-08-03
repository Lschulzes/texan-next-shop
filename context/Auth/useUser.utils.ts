import { ClientSafeProvider } from 'next-auth/react';
import { IUser } from '../../interfaces';
import { FormInput } from '../../pages/auth/login';
import { RegisterFormInput } from '../../pages/auth/register';

export type Providers = Array<ClientSafeProvider>;

export type UserContextState = {
  user: IUser | null;

  // States
  isLoading: boolean;
  isAuthenticated: boolean;
  providers: Providers;

  logoutUser: () => void;
  loginUser: (formData: FormInput) => Promise<void>;
  registerUser: (formData: RegisterFormInput) => Promise<void>;
};

export const USER_KEY = '@texan-base-info';

export type SessionNextAuth = IUser & { _doc: IUser };
