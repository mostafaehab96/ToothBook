import React, { createContext, useContext, useReducer } from "react";
import api_client from "../src/Services/api_client";
import User from "../src/interfaces/User";
import RegisterFormValues from "../src/interfaces/RegisterFormValues";

interface AuthProviderProps {
  children: React.JSX.Element;
}

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  login: undefined | ((email: string, password: string) => void);
  register: undefined | ((body: RegisterFormValues) => void);
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
  register: undefined,
};
const AuthContext = createContext<Auth | null>(null);

function reducer(state: Auth, action: Action): Auth {
  switch (action.type) {
    case "REGISTER":
      return action.payload;
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

  async function login(email: string, password: string) {
    const body = {
      email,
      password,
    };
    console.log(body);
    try {
      const response = await api_client.post("/users/login", body);
      console.log(response);

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      console.log("POST request successful:\n", data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }
  async function register(body: RegisterFormValues) {
    console.log(JSON.stringify(body));
    try {
      const response = await api_client.post("/users/register", body);
      console.log(response);

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      console.log("POST request successful:\n", data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }
  function logout() {}

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout }}
    >
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
