import { createContext, useContext, useEffect, useReducer } from "react";
import Case from "../src/interfaces/Case";
import React from "react";
import {
  createObjectWithFalseValues,
  createObjectWithTrueValues,
} from "../src/utils/createObjectOfFalse";
import Department from "../src/interfaces/Department";
import MedicalCompromises from "../src/interfaces/MedicalCompromises";
import Status from "../src/interfaces/Status";
import { Filters } from "../src/components/Cases/FilterSelector";
import api_client from "../src/Services/api_client";

const URL = "http://localhost:4000/api/";
const CASES_LIMIT_PER_PAGE = 15;

interface ContextType {
  totalPages: number;
  currentPage: number;
  setPage: (n: number) => void;
  cases: Array<Case>;
  isLoading: boolean;
  error: string;
  filters: Filters;
  filterItemChecked: null | ((filter: string, filterItem: string) => void);
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
  filterItemChecked: null,
  deleteCase: null,
  filters: {
    department: createObjectWithFalseValues(Object.keys(Department)),
    medicalCompromises: createObjectWithFalseValues(
      Object.keys(MedicalCompromises)
    ),
    status: createObjectWithFalseValues(Object.keys(Status)),
    emergency: createObjectWithTrueValues(["Emergency", "notEmergency"]),
  },
};

const CasesContext = createContext(initialState);

function reducer(state: ContextType, action: ReducerAction) {
  switch (action.type) {
    case "filterItemChecked":
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

        return { ...state, filters: updatedFilters };
      } else {
        return state;
      }
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
  const [
    { cases, isLoading, error, currentPage, totalPages, filters },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log(filters);

  useEffect(
    function () {
      async function fetchCases() {
        dispatch({ type: "loading", payload: undefined });
        try {
          const filterParams = {
            page: currentPage,
            limit: CASES_LIMIT_PER_PAGE,
          };

          if (filters.emergency.Emergency !== filters.emergency.notEmergency) {
            if (filters.emergency.Emergency)
              filterParams["isEmergency" as keyof typeof filterParams] = true;
            else
              filterParams["isEmergency" as keyof typeof filterParams] = false;
          }

          // console.log(filterParams);

          const res = await api_client.get("patients", {
            params: filterParams,
          });
          const jsRes = await res.data;

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
    [currentPage, filters]
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

  function filterItemChecked(filter: string, filterItem: string) {
    dispatch({ type: "filterItemChecked", payload: { filter, filterItem } });
  }

  return (
    <CasesContext.Provider
      value={{
        totalPages,
        currentPage,
        cases,
        isLoading,
        error,
        filters,
        filterItemChecked,
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
