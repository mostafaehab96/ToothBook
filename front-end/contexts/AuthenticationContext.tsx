import React, { createContext, useContext, useReducer } from "react";
import api_client from "../src/Services/api_client";
import User from "../src/interfaces/User";
import RegisterFormValues from "../src/interfaces/RegisterFormValues";
import { useNavigate } from "react-router";

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
  payload: any;
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
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user, token: action.payload.token },
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user, token: action.payload.token },
      };
    case "LOGOUT":
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
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    const body = {
      email,
      password,
    };
    try {
      const response = await api_client.post("/users/login", body);
      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data.token,
          user: response.data.data.user,
        },
      });
      navigate("cases");
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
  function logout() {
    dispatch({ type: "LOGOUT", payload: {} });
    navigate("/login");
  }

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
