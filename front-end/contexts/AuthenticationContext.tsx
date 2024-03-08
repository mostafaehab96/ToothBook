import React, { createContext, useContext, useEffect, useReducer } from "react";
import api_client from "../src/Services/api_client";
import User from "../src/interfaces/User";
import RegisterFormValues from "../src/interfaces/RegisterFormValues";
import { useNavigate } from "react-router";
import isTokenExpired from "../src/utils/isTokenExpired";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
  children: React.JSX.Element;
}

interface Auth {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  fetchingToken: boolean;
  login: undefined | ((email: string, password: string) => void);
  register:
    | undefined
    | ((body: RegisterFormValues, profilePicture: File | undefined) => void);
  logout: undefined | (() => void);
  updateUser: undefined | (() => void);
  isLoading: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
  error: "",
  fetchingToken: true,
  isLoading: false,
  login: undefined,
  logout: undefined,
  register: undefined,
  updateUser: undefined,
};
const AuthContext = createContext<Auth | null>(null);

function reducer(state: Auth, action: Action): Auth {
  switch (action.type) {
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload as string,
      };
    case "LOAD_USER":
      if (action.payload.token) {
        return {
          ...state,
          isAuthenticated: true,
          user: { ...action.payload.user, token: action.payload.token },
        };
      }
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user, token: action.payload.token },
        error: "",
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload.user, token: action.payload.token },
        isLoading: false,
        error: "",
      };
    case "LOGOUT":
      return { ...initialState, fetchingToken: false };
    case "START_FETCHING_TOKEN":
      return { ...state, fetchingToken: true };
    case "DONE_FETCHING_TOKEN":
      return { ...state, fetchingToken: false };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    default:
      break;
  }
  return state;
}

function AuthenticationProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated, error, fetchingToken, isLoading }, dispatch] =
    useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(function () {
    async function handleTokenLogin() {
      dispatch({ type: "START_FETCHING_TOKEN", payload: undefined });
      const token =
        localStorage.getItem("token") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

      if (token && !isTokenExpired(token)) {
        const { id } = jwtDecode(token);
        const fetchedUser: User = await fetchUser(id);
        dispatch({
          type: "LOAD_USER",
          payload: { user: fetchedUser, token },
        });
      } else {
        localStorage.removeItem("token");
      }

      dispatch({ type: "DONE_FETCHING_TOKEN", payload: undefined });
    }
    handleTokenLogin();
  }, []);

  async function login(email: string, password: string) {
    const body = {
      email,
      password,
    };
    try {
      dispatch({ type: "LOADING", payload: true });
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

      localStorage.setItem("token", response.data.data.token);
      navigate("cases");
    } catch (err) {
      console.error("Error during POST request:", error);
      let errorMessage: string = "";
      if (err instanceof Error) errorMessage = err.message;
      dispatch({
        type: "error",
        payload: errorMessage,
      });
      if (isLoading) dispatch({ type: "LOADING", payload: false });
    }
  }
  async function register(
    body: RegisterFormValues,
    profilePicture: File | undefined
  ) {
    try {
      dispatch({ type: "LOADING", payload: true });
      const cehckRequestBody = { email: body.email };
      const checkUserExistsResponse = await api_client.post(
        "/users/exists",
        cehckRequestBody
      );
      if (checkUserExistsResponse.data.status !== "success") {
        throw new Error(
          `HTTP errorrrrr! Status: ${checkUserExistsResponse.status}`
        );
      }
      if (checkUserExistsResponse.data.data) {
        throw new Error(`this user already exists:`);
      }

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

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data.data;
      dispatch({
        type: "REGISTER",
        payload: { user: data.user, token: data.token },
      });
      localStorage.setItem("token", data.token);

      navigate("/cases");
    } catch (err) {
      console.error("Error during POST request:", error);
      let errorMessage: string = "";
      if (err instanceof Error) errorMessage = err.message;
      dispatch({
        type: "error",
        payload: errorMessage,
      });
    }
  }
  function logout() {
    dispatch({ type: "LOGOUT", payload: {} });
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function fetchUser(id: string) {
    const response = await api_client.get(`users/${id}`);
    if (response.data.status !== "success") {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data.data.user;
  }
  async function updateUser() {
    if (!user) return;
    const fetchedUser = await fetchUser(user?._id);
    dispatch({
      type: "LOAD_USER",
      payload: {
        user: fetchedUser,
      },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        fetchingToken,
        isLoading,
        register,
        login,
        logout,
        updateUser,
      }}
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
