import React, { useContext, createContext, useMemo, useState, Dispatch, SetStateAction } from "react";
import LocalStorage from "../../shared/components/LocalStorage";
import { User } from "../../models/User/user.model";

export interface AuthState {
  authenticated?: boolean;
  user?: User;
}

type SetAuthState = Dispatch<SetStateAction<AuthState>>;

type AuthContentProps = [AuthState, SetAuthState];

// Define the default context state
const initialValues: AuthState = {
  authenticated: !!LocalStorage.getItem("authHeaders") || false,
  user: LocalStorage.getItem("user") || undefined,
};

// Create the context
const AuthContent: any = createContext({});

// Create method to use context
const AuthContext = () => {
  const context = useContext<AuthContentProps>(AuthContent);
  if (!context) {
    throw new Error(`useContext must be used within a contextProvider`);
  }
  const [auth, setAuth] = context;

  const setAuthenticated = (user?: User) => {
    setAuth(() => ({
      authenticated: user ? true : false,
      user: user ? user : new User(),
    }));
  };

  const setUnauthenticated = () => {
    LocalStorage.clear()
    setAuth((auth) => ({
      ...auth,
      authenticated: false,
      user: undefined
    }));
  };

  return {
    ...auth,
    setAuthenticated,
    setUnauthenticated,
  };
};

// Create the context provider
const AuthProvider = (ownProps: any) => {
  const [auth, setAuth] = useState<AuthState>(initialValues);
  const value = useMemo(() => [auth, setAuth], [auth]);
  return <AuthContent.Provider value={value} {...ownProps} />;
}

export { AuthProvider, AuthContext };
