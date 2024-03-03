import { Filters } from "../components/Cases/FilterSelector";

function createFilterParams(filters: Filters) {
  const filterParams = {};

  if (filters.emergency.Emergency !== filters.emergency.notEmergency) {
    if (filters.emergency.Emergency)
      filterParams["isEmergency" as keyof typeof filterParams] = true;
    else filterParams["isEmergency" as keyof typeof filterParams] = false;
  }
  if (
    filters.medicalCompromised.MedicalCompromised !==
    filters.medicalCompromised.NotMedicalCompromised
  ) {
    if (filters.medicalCompromised.MedicalCompromised)
      filterParams["medicalCompromised" as keyof typeof filterParams] = true;
    else
      filterParams["medicalCompromised" as keyof typeof filterParams] = false;
  }

  return filterParams;
}

export default createFilterParams;
