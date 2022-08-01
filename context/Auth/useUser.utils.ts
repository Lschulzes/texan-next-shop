import { IUser } from "../../interfaces";

export type setBaseInfoArgs = { token: string };

export type UserContextState = {
  user: IUser | null;

  // States
  isLoading: boolean;
  isAuthenticated: boolean;

  logoutUser: () => void;
  setBaseInfo: ({ token }: setBaseInfoArgs) => void;
};

export type BaseInfo = {
  token: string | null;
};

export const INITIAL_BASE_INFO = {
  token: null,
};

export const USER_KEY = "@texan-base-info";
