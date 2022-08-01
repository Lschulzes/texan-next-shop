import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { texanAPI } from "../../api";
import { usePersistState } from "../../hooks";
import { IUser } from "../../interfaces";
import {
  BaseInfo,
  INITIAL_BASE_INFO,
  setBaseInfoArgs,
  USER_KEY,
  UserContextState,
} from "./useUser.utils";

const UserContext = createContext<UserContextState>({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  logoutUser: () => null,
  setBaseInfo: ({ token }: setBaseInfoArgs) => token && null,
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [baseInfo, setBaseInfo] = usePersistState<BaseInfo>(
    USER_KEY,
    INITIAL_BASE_INFO
  );

  const { token } = baseInfo;

  useEffect(() => {
    if (isAuthenticated || !!user || !token) return;
    const controller = new AbortController();

    (async () => {
      setIsLoading(true);
      const { data } = await texanAPI.get("/user/validate-jwt");
      setIsLoading(false);
      if (!data.user) return;

      setUser(data.user);
      setIsAuthenticated(true);
    })();

    return () => controller.abort();
  }, [isAuthenticated, user, token]);

  const logoutUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setBaseInfo(INITIAL_BASE_INFO);
  }, [setBaseInfo]);

  const state: UserContextState = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      setBaseInfo,
      logoutUser,
    }),
    [user, isAuthenticated, setBaseInfo, logoutUser, isLoading]
  );

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default useUser;
