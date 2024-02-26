import {
  Button,
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useReducer } from "react";
import { BsChevronDown } from "react-icons/bs";
import Department from "../../interfaces/Department";
import toTitleCase from "../../utils/toTitleCase";
import createObjectWithFalseValues from "../../utils/createObjectOfFalse";
import MedicalCompromises from "../../interfaces/MedicalCompromises";
import Status from "../../interfaces/Status";
import Emergency from "../../interfaces/Emergency";

interface Filters {
  department: Record<string, boolean>;
  status: Record<string, boolean>;
  medicalCompromises: Record<string, boolean>;
  emergency: Record<string, boolean>;
}

const initialState: Filters = {
  department: createObjectWithFalseValues(Object.keys(Department)),
  medicalCompromises: createObjectWithFalseValues(
    Object.keys(MedicalCompromises)
  ),
  status: createObjectWithFalseValues(Object.keys(Status)),
  emergency: createObjectWithFalseValues(["Emergency", "notEmergency"]),
};

const filterTypes = {
  department: Department,
  medicalCompromises: MedicalCompromises,
  status: Status,
  emergency: Emergency,
};

interface ActionInterface {
  type: string;
  payload: string;
}

function reducer(state: Filters, action: ActionInterface) {
  switch (action.type) {
    case "department/checked":
      return {
        ...state,
        department: {
          ...state.department,
          [action.payload]: !state.department[action.payload],
        },
      };
    case "status/checked":
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload]: !state.status[action.payload],
        },
      };
    case "medicalCompromises/checked":
      return {
        ...state,
        medicalCompromises: {
          ...state.medicalCompromises,
          [action.payload]: !state.medicalCompromises[action.payload],
        },
      };
    case "emergency/checked":
      return {
        ...state,
        emergency: {
          ...state.emergency,
          [action.payload]: !state.emergency[action.payload],
        },
      };
    default:
      break;
  }
  return state;
}

function FilterSelectors() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HStack>
      {Object.keys(filterTypes).map((type) => (
        <FilterSelector
          key={type}
          filterName={type}
          filters={state[type as keyof Filters]}
          dispatch={dispatch}
        />
      ))}
    </HStack>
  );
}

interface FilterSelectorProps {
  filters: Record<string, boolean>;
  filterName: string;
  dispatch: React.Dispatch<ActionInterface>;
}

function FilterSelector({
  filters,
  filterName,
  dispatch,
}: FilterSelectorProps) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {toTitleCase(filterName)}
      </MenuButton>
      <MenuList>
        {Object.keys(filterTypes[filterName as keyof typeof filterTypes]).map(
          (dep) => (
            <MenuItem key={dep}>
              <HStack width={"100%"} justifyContent="space-between">
                <Text>{toTitleCase(dep)}</Text>
                <Checkbox
                  isChecked={filters[dep]}
                  onChange={() =>
                    dispatch({ type: `${filterName}/checked`, payload: dep })
                  }
                />
              </HStack>
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
}

export default FilterSelectors;
