import IsMedicalCompromised from "./IsMedicalCompromised";
import Department from "./Department";
import Sex from "./Sex";
import { createObjectWithFalseValues } from "../utils/createObjectOfFalse";

interface Filters {
  department: Record<string, boolean>;
  medicalCompromised: Record<string, boolean>;
  emergency: Record<string, boolean>;
  sex: Record<string, boolean>;
}

const filtersInitialState = {
  department: createObjectWithFalseValues(Object.keys(Department)),
  sex: createObjectWithFalseValues(Object.keys(Sex)),
  medicalCompromised: createObjectWithFalseValues(
    Object.keys(IsMedicalCompromised)
  ),
  emergency: createObjectWithFalseValues(["Emergency", "notEmergency"]),
};

export type { Filters };
export { filtersInitialState };
