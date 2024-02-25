const createObjectWithFalseValues = <T extends string>(
  keys: T[]
): Record<T, boolean> => {
  return keys.reduce((obj, key) => {
    obj[key] = false;
    return obj;
  }, {} as Record<T, boolean>);
};

export default createObjectWithFalseValues;
