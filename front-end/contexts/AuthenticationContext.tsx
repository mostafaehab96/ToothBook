import React, { createContext, useContext, useReducer } from "react";

interface AuthProviderProps {
  children: React.JSX.Element;
}

interface User {
  id: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  login: undefined | ((email: string, password: string) => void);
  logout: undefined | (() => void);
}

interface Action {
  type: string;
  payload: Auth;
}

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
  login: undefined,
  logout: undefined,
};
const AuthContext = createContext<Auth | null>(null);

function reducer(state: Auth, action: Action): Auth {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGUT":
      return initialState;
    default:
      break;
  }
  return state;
}

function AuthenticationProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {}
  function logout() {}

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null)
    throw new Error("useAuth must be used within the AuthProvider");
  return context;
}

export { AuthenticationProvider, useAuth };
