import { createContext, useContext, useEffect, useReducer } from "react";
import Case from "../src/interfaces/Case";
import React from "react";
import { Filters } from "../src/interfaces/Filters";
import api_client from "../src/Services/api_client";
import createFilterParams from "../src/utils/createFilterParams";
import { backendUrl } from "../src/Services/api_client";
import { filtersInitialState } from "../src/interfaces/Filters";
import { useAuth } from "./AuthenticationContext";

const CASES_LIMIT_PER_PAGE = 15;

interface Props {
  children: React.JSX.Element;
}

interface ContextType {
  totalPages: number;
  currentPage: number;
  cases: Array<Case>;
  isLoadingCases: boolean;
  error: string;
  actionSignal: number;
  filters: Filters;
  setActionSignal: null | (() => void);
  setPage: (n: number) => void;
  filterItemChecked: null | ((filter: string, filterItem: string) => void);
  createCase: null | ((newCase: Case) => void);
}

const initialState: ContextType = {
  setPage: () => {},
  totalPages: 8,
  currentPage: 1,
  cases: [],
  actionSignal: 3423,
  isLoadingCases: false,
  error: "",
  setActionSignal: null,
  createCase: null,
  filterItemChecked: null,
  filters: filtersInitialState,
};

const CasesContext = createContext(initialState);

// #region reducer types

type ACTION_SIGNAL = { type: "ACTION_SIGNAL"; payload: number };
type SET_PAGE = { type: "SET_PAGE"; payload: number };
type ERROR = { type: "ERROR"; payload: string };
type LOADING_CASES = { type: "LOADING_CASES" };
type CASE_CREATED = { type: "CASE_CREATED"; payload: Case };
type CASES_LOADED = {
  type: "CASES_LOADED";
  payload: {
    patients: Case[];
    totalCount: number;
  };
};
type FILTER_ITEM_CHECKED = {
  type: "FILTER_ITEM_CHECKED";
  payload: { filter: string; filterItem: string };
};

type ReducerAction =
  | ACTION_SIGNAL
  | SET_PAGE
  | ERROR
  | LOADING_CASES
  | CASES_LOADED
  | CASE_CREATED
  | FILTER_ITEM_CHECKED;

// #endregion action types

function reducer(state: ContextType, action: ReducerAction) {
  switch (action.type) {
    case "ACTION_SIGNAL":
      return { ...state, actionSignal: action.payload };
    case "FILTER_ITEM_CHECKED":
      if (
        state.filters[action.payload.filter as keyof Filters] &&
        state.filters[action.payload.filter as keyof Filters][
          action.payload.filterItem
        ] !== undefined
      ) {
        const updatedFilters: Filters = {
          ...state.filters,
          [action.payload.filter]: {
            ...state.filters[action.payload.filter as keyof Filters],
            [action.payload.filterItem]:
              !state.filters[action.payload.filter as keyof Filters][
                action.payload.filterItem
              ],
          },
        };

        return { ...state, filters: updatedFilters, isLoadingCases: false };
      } else {
        return state;
      }
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "ERROR":
      return { ...state, error: action.payload, isLoadingCases: false };
    case "LOADING_CASES":
      return { ...state, isLoadingCases: true, error: "" };
    case "CASES_LOADED":
      return {
        ...state,
        isLoadingCases: false,
        cases: action.payload.patients,
        totalPages: Math.ceil(action.payload.totalCount / CASES_LIMIT_PER_PAGE),
      };
    case "CASE_CREATED":
      return {
        ...state,
        isLoadingCases: false,
        cases: [...state.cases, action.payload],
      };
    default:
      throw new Error("unknown action type");
  }
}

function CasesProvider({ children }: Props) {
  const [
    {
      cases,
      isLoadingCases,
      error,
      currentPage,
      totalPages,
      filters,
      actionSignal,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // const fetchCases = useCallback(

  //   [currentPage, filters]
  // );

  const { user } = useAuth();
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCases() {
        dispatch({ type: "LOADING_CASES" });
        try {
          const filterParams = createFilterParams(filters);
          const params = {
            page: currentPage,
            limit: CASES_LIMIT_PER_PAGE,
            ...filterParams,
          };

          const res = await api_client.get("patients", {
            params,
            signal: controller.signal,
          });
          const jsRes = await res.data;

          if (jsRes.status === "success") {
            dispatch({
              type: "CASES_LOADED",
              payload: {
                patients: jsRes.data.patients,
                totalCount: jsRes.data.totalCount,
              },
            });
          }
        } catch (e) {
          if (e.name != "CanceledError") {
            dispatch({
              type: "ERROR",
              payload: "error happened during fetching cases",
            });
          }
        }
      }

      fetchCases();
      return function () {
        controller.abort();
      };
    },
    [currentPage, filters, user]
  );

  async function createCase(newCase: Case) {
    dispatch({ type: "LOADING_CASES" });
    try {
      const res = await fetch(`${backendUrl}cases`, {
        method: "POST",
        body: JSON.stringify(newCase),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "CASE_CREATED", payload: data });
    } catch (e) {
      dispatch({
        type: "ERROR",
        payload: "error happened during creating case",
      });
    }
  }

  function setPage(pageNumber: number) {
    if (pageNumber <= totalPages && pageNumber >= 1) {
      dispatch({ type: "SET_PAGE", payload: pageNumber });
    }
  }

  function filterItemChecked(filter: string, filterItem: string) {
    dispatch({ type: "FILTER_ITEM_CHECKED", payload: { filter, filterItem } });
  }

  function setActionSignal() {
    dispatch({ type: "ACTION_SIGNAL", payload: Math.random() });
  }

  return (
    <CasesContext.Provider
      value={{
        totalPages,
        currentPage,
        cases,
        isLoadingCases,
        error,
        filters,
        actionSignal,
        setActionSignal,
        filterItemChecked,
        createCase,
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
