import { IUser } from '../../interfaces';
import { FormInput } from '../../pages/auth/login';
import { RegisterFormInput } from '../../pages/auth/register';

export type UserContextState = {
  user: IUser | null;

  // States
  isLoading: boolean;
  isAuthenticated: boolean;

  logoutUser: () => void;
  loginUser: (formData: FormInput) => Promise<void>;
  registerUser: (formData: RegisterFormInput) => Promise<void>;
};

export const USER_KEY = '@texan-base-info';

export type SessionNextAuth = {
  user: IUser & { _doc: IUser };
};
