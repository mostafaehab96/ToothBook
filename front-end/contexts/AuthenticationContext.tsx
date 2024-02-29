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
  error: string;
  login: undefined | ((email: string, password: string) => void);
  register:
    | undefined
    | ((body: RegisterFormValues, profilePicture: File | undefined) => void);
  logout: undefined | (() => void);
}

interface Action {
  type: string;
  payload: any;
}

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
  error: "",
  login: undefined,
  logout: undefined,
  register: undefined,
};
const AuthContext = createContext<Auth | null>(null);

function reducer(state: Auth, action: Action): Auth {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.payload as string,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user, token: action.payload.token },
        error: "",
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user, token: action.payload.token },
        error: "",
      };
    case "LOGOUT":
      return initialState;
    default:
      break;
  }
  return state;
}

function AuthenticationProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
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
          token: response.data.data.token,
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
  async function register(
    body: RegisterFormValues,
    profilePicture: File | undefined
  ) {
    console.log(JSON.stringify(body));
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("email", body.email);
      formData.append("password", body.password);
      formData.append("university", body.university);
      if (profilePicture != null && profilePicture)
        formData.append("photo", profilePicture, `image${Math.random()}.jpg`);

      const response = await api_client.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data.data;
      dispatch({
        type: "REGISTER",
        payload: { user: data.user, token: data.token },
      });
      navigate("/cases");
      console.log("POST request successful:\n", data);
    } catch (error) {
      console.error("Error during POST request:", error);
      dispatch({ type: "error", payload: "this user already exists" });
    }
  }
  function logout() {
    dispatch({ type: "LOGOUT", payload: {} });
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, register, login, logout }}
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
