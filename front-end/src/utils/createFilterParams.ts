import { Filters } from "../interfaces/Filters";

type FilterParams = {
  departments?: Array<string>;
  sex?: string;
  isEmergency?: boolean;
  medicalCompromised?: boolean;
};

function createFilterParams(filters: Filters) {
  const filterParams: FilterParams = {};

  filterParams.departments = Object.keys(filters.department).filter(
    (key) => filters.department[key]
  );
  if (filters.sex.Male !== filters.sex.Female) {
    if (filters.sex.Male) filterParams.sex = "male";
    else filterParams.sex = "female";
  }
  if (filters.emergency.Emergency !== filters.emergency.notEmergency) {
    if (filters.emergency.Emergency) filterParams.isEmergency = true;
    else filterParams.isEmergency = false;
  }
  if (
    filters.medicalCompromised.MedicalCompromised !==
    filters.medicalCompromised.NotMedicalCompromised
  ) {
    if (filters.medicalCompromised.MedicalCompromised)
      filterParams.medicalCompromised = true;
    else filterParams.medicalCompromised = false;
  }

  return filterParams;
}

export default createFilterParams;
