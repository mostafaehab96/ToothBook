import { createContext, useContext, useEffect, useReducer } from "react";
import Case from "../src/components/Case/Case";
import React from "react";

const URL = "http://localhost:9000/";

interface ContextType {
  cases: Array<Case>;
  isLoading: boolean;
  error: string;
  createCase: null | ((newCase: Case) => void);
  deleteCase: null | ((id: number) => void);
}

interface Props {
  children: React.JSX.Element;
}

interface ReducerAction {
  type: string;
  payload: any;
}

const initialState: ContextType = {
  cases: [],
  isLoading: false,
  error: "",
  createCase: null,
  deleteCase: null,
};

const CasesContext = createContext(initialState);

function reducer(state: ContextType, action: ReducerAction) {
  switch (action.type) {
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "case/loaded":
      return { ...state, isLoading: false, currentCase: action.payload };
    case "cases/loaded":
      return { ...state, isLoading: false, cases: action.payload };
    case "case/created":
      return {
        ...state,
        isLoading: false,
        cases: [...state.cases, action.payload],
        currentCase: action.payload,
      };
    default:
      throw new Error("unknown action type");
  }
}

function CasesProvider({ children }: Props) {
  const [{ cases, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCases() {
      dispatch({ type: "loading", payload: undefined });
      try {
        const res = await fetch(`${URL}cases`);
        const data = await res.json();
        dispatch({ type: "cases/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "error happened during fetching cases",
        });
      }
    }
    fetchCases();
  }, []);

  async function createCase(newCase: Case) {
    dispatch({ type: "loading", payload: undefined });
    try {
      const res = await fetch(`${URL}cases`, {
        method: "POST",
        body: JSON.stringify(newCase),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "case/created", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error happened during creating case",
      });
    }
  }

  async function deleteCase(caseId: number) {
    dispatch({ type: "loading", payload: undefined });
    try {
      await fetch(`${URL}cases/${caseId}`, {
        method: "DELETE",
      });
      dispatch({ type: "case/deleted", payload: caseId });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "error happened during deleting case",
      });
    }
  }

  return (
    <CasesContext.Provider
      value={{
        cases,
        isLoading,
        error,
        createCase,
        deleteCase,
      }}
    >
      {children}
    </CasesContext.Provider>
  );
}

function useCases() {
  const context = useContext(CasesContext);
  if (context === undefined)
    throw new Error("'CasesContext' is used outside the 'CasesProvider'");
  return context;
}

export { CasesProvider, useCases };
