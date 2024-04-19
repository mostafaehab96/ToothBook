import { createContext, useContext, useEffect, useReducer } from "react";
import Case from "../interfaces/Case";
import React from "react";
import api_client from "../Services/api_client";
import { useAuth } from "./AuthenticationContext";

type USER_CASES_LOADED = { type: "USER_CASES_LOADED"; payload: Array<Case> };
type FETCHING_ERROR = { type: "FETCHING_ERROR"; payload: string };
type LOADING_TRUE = { type: "LOADING_TRUE" };
type LOADING_FALSE = { type: "LOADING_FALSE" };

interface ContextType {
  isLoadingUserCases: boolean;
  errorUserCases: string;
  userCases: Array<Case>;
}

interface Props {
  children: React.JSX.Element;
}

type ReducerAction =
  | USER_CASES_LOADED
  | FETCHING_ERROR
  | LOADING_FALSE
  | LOADING_TRUE;

const initialState: ContextType = {
  isLoadingUserCases: false,
  userCases: [],
  errorUserCases: "",
};

const UserCasesContext = createContext(initialState);

function reducer(state: ContextType, action: ReducerAction) {
  switch (action.type) {
    case "USER_CASES_LOADED":
      return { ...state, userCases: action.payload };

    case "FETCHING_ERROR":
      return { ...state, errorUserCases: action.payload };

    case "LOADING_TRUE":
      return { ...state, isLoadingUserCases: true, errorUserCases: "" };
    case "LOADING_FALSE":
      return { ...state, isLoadingUserCases: false };

    default:
      throw new Error("unknown action type");
  }
}

function UserCasesProvider({ children }: Props) {
  const [{ isLoadingUserCases, errorUserCases, userCases }, dispatch] =
    useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(
    function () {
      async function fetchUserCases() {
        dispatch({ type: "LOADING_TRUE" });
        if (!user || !user?.activePatients) {
          dispatch({
            type: "FETCHING_ERROR",
            payload: "error happened during fetching cases",
          });
          return;
        }
        try {
          const userCases: Array<Case> = [];
          for (const cas of user.activePatients) {
            const res = await api_client.get(`patients/${cas}`);
            userCases.push(res.data.data.patient);
          }
          for (const cas of user.treatedPatients) {
            const res = await api_client.get(`patients/${cas}`);
            userCases.push(res.data.data.patient);
          }
          dispatch({ type: "USER_CASES_LOADED", payload: userCases });
        } catch (e) {
          dispatch({
            type: "FETCHING_ERROR",
            payload: "error happened during fetching cases",
          });
        } finally {
          dispatch({ type: "LOADING_FALSE" });
        }
      }
      fetchUserCases();
    },
    [user]
  );

  return (
    <UserCasesContext.Provider
      value={{
        isLoadingUserCases,
        errorUserCases,
        userCases,
      }}
    >
      {children}
    </UserCasesContext.Provider>
  );
}

function useUserCases() {
  const context = useContext(UserCasesContext);
  if (context === undefined)
    throw new Error(
      "'UserCasesContext' is used outside the 'UserCasesProvider'"
    );
  return context;
}

export { UserCasesProvider, useUserCases };
