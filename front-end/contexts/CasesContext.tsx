import { createContext, useContext, useEffect, useReducer } from "react";
import Case from "../src/interfaces/Case";
import React from "react";

const URL = "http://localhost:4000/api/";
const CASES_LIMIT_PER_PAGE = 15;

interface ContextType {
  totalPages: number;
  currentPage: number;
  setPage: (n: number) => void;
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
  setPage: () => {},
  totalPages: 8,
  currentPage: 1,
  cases: [],
  isLoading: false,
  error: "",
  createCase: null,
  deleteCase: null,
};

const CasesContext = createContext(initialState);

function reducer(state: ContextType, action: ReducerAction) {
  switch (action.type) {
    case "set_page":
      return { ...state, currentPage: action.payload };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "case/loaded":
      console.log(action.payload);
      return { ...state, isLoading: false, currentCase: action.payload };
    case "cases/loaded":
      return {
        ...state,
        isLoading: false,
        cases: action.payload.patients,
        totalPages: Math.ceil(action.payload.totalCount / CASES_LIMIT_PER_PAGE),
      };
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
  const [{ cases, isLoading, error, currentPage, totalPages }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchCases() {
        dispatch({ type: "loading", payload: undefined });
        try {
          const res = await fetch(
            `${URL}patients?page=${currentPage}&limit=${CASES_LIMIT_PER_PAGE}`
          );
          const jsRes = await res.json();
          if (jsRes.status === "success") {
            dispatch({
              type: "cases/loaded",
              payload: {
                patients: jsRes.data.patients,
                totalCount: jsRes.data.totalCount,
              },
            });
          }
        } catch (e) {
          dispatch({
            type: "rejected",
            payload: "error happened during fetching cases",
          });
        }
      }
      fetchCases();
    },
    [currentPage]
  );

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

  function setPage(pageNumber: number) {
    if (pageNumber <= totalPages && pageNumber >= 1) {
      dispatch({ type: "set_page", payload: pageNumber });
    }
  }

  return (
    <CasesContext.Provider
      value={{
        totalPages,
        currentPage,
        cases,
        isLoading,
        error,
        createCase,
        deleteCase,
        setPage,
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
