import Department from "../interfaces/Department";

function displayPropertyValues(
  value: Department[] | string | string[] | number | boolean | null
) {
  return value instanceof Array ? value.join(", ") : value;
}

export default displayPropertyValues;
