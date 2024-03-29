import { getProviders, signOut, useSession } from 'next-auth/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { texanAPI } from '../../api';
import { IUser } from '../../interfaces';
import { FormInput } from '../../pages/auth/login';
import { RegisterFormInput } from '../../pages/auth/register';
import { useCart } from '../Cart';
import { Providers, UserContextState } from './useUser.utils';

const UserContext = createContext<UserContextState>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  providers: [],

  logoutUser: () => null,
  loginUser: (formData: FormInput) => formData && Promise.resolve(),
  registerUser: (formData: RegisterFormInput) => formData && Promise.resolve(),
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState<Providers>([]);

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(Object.values(prov || {}));
    });
  }, []);

  const { removeAllProducts } = useCart();

  const { data, status } = useSession();
  useEffect(() => {
    if (status !== 'authenticated' || isAuthenticated) return;

    setUser(data.user as IUser);
    setIsAuthenticated(true);
  }, [status, data, isAuthenticated]);

  const loginUser = useCallback(async (formData: FormInput) => {
    setIsLoading(true);
    const { data } = await texanAPI.post('/user/login', formData);
    setIsLoading(false);
    if (!data.user) return;

    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const registerUser = useCallback(async (formData: RegisterFormInput) => {
    setIsLoading(true);
    await texanAPI.post('/user/register', formData);
    setIsLoading(false);
  }, []);

  const logoutUser = useCallback(async () => {
    await signOut();
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
      providers,
    }),
    [user, isAuthenticated, logoutUser, isLoading, loginUser, registerUser, providers],
  );

  return <UserContext.Provider value={state}>{props.children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export default useUser;
