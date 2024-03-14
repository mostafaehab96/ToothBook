import { Filters } from "../interfaces/Filters";

function createFilterParams(filters: Filters) {
  const filterParams = {};

  filterParams["departments"] = Object.keys(filters.department).filter(
    (key) => filters.department[key]
  );
  if (filters.sex.Male !== filters.sex.Female) {
    if (filters.sex.Male)
      filterParams["sex" as keyof typeof filterParams] = "male";
    else filterParams["sex" as keyof typeof filterParams] = "female";
  }
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
