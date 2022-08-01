import Cookies from "js-cookie";
import { useRouter } from "next/router";
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
import { CartContext, CART_KEY, useCart } from "../Cart";
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

  const { removeAllProducts } = useCart();

  const { pathname, push, query } = useRouter();

  useEffect(() => {
    if (
      isAuthenticated &&
      !query?.previousPath?.length &&
      pathname.includes("auth")
    )
      push("/");
  }, [pathname, push, isAuthenticated, query]);

  const token = Cookies.get("token");

  useEffect(() => {
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

    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const registerUser = useCallback(async (formData: RegisterFormInput) => {
    setIsLoading(true);
    const { data } = await texanAPI.post("/user/register", formData);
    setIsLoading(false);
    if (!data.user) return;

    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const logoutUser = useCallback(() => {
    Cookies.remove("token");
    removeAllProducts();
    setUser(null);
    setIsAuthenticated(false);
  }, [removeAllProducts]);

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
