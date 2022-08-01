import Cookies from "js-cookie";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { texanAPI } from "../../api";
import { IUser } from "../../interfaces";
import { FormInput } from "../../pages/auth/login";
import { RegisterFormInput } from "../../pages/auth/register";
import { UserContextState } from "./useUser.utils";

const UserContext = createContext<UserContextState>({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  logoutUser: () => null,
  loginUser: (formData: FormInput) => formData && Promise.resolve(),
  registerUser: (formData: RegisterFormInput) => formData && Promise.resolve(),
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    console.log({ token });
    if (!!user || isAuthenticated || !token) return;
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
  }, [user, isAuthenticated, token]);

  const loginUser = useCallback(async (formData: FormInput) => {
    setIsLoading(true);
    const { data } = await texanAPI.post("/user/login", formData);
    setIsLoading(false);
    if (!data.user) return;

    Cookies.set("token", data.token);

    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const registerUser = useCallback(async (formData: RegisterFormInput) => {
    setIsLoading(true);
    const { data } = await texanAPI.post("/user/register", formData);
    setIsLoading(false);
    if (!data.user) return;

    Cookies.set("token", data.token);

    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const logoutUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const state: UserContextState = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      logoutUser,
      loginUser,
      registerUser,
    }),
    [user, isAuthenticated, logoutUser, isLoading, loginUser, registerUser]
  );

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default useUser;