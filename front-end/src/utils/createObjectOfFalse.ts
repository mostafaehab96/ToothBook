const createObjectWithFalseValues = <T extends string>(
  keys: T[]
): Record<T, boolean> => {
  return keys.reduce((obj, key) => {
    obj[key] = false;
    return obj;
  }, {} as Record<T, boolean>);
};

const createObjectWithTrueValues = <T extends string>(
  keys: T[]
): Record<T, boolean> => {
  return keys.reduce((obj, key) => {
    obj[key] = true;
    return obj;
  }, {} as Record<T, boolean>);
};

export { createObjectWithFalseValues, createObjectWithTrueValues };
