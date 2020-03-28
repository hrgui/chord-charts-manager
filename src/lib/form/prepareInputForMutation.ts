export function prepareInputForMutation(input) {
  if (typeof input !== "object" || !input) {
    return input;
  }
  const { id, __typename, ...other } = input;
  const res = {};

  Object.keys(other).forEach(otherKey => {
    let value = other[otherKey];
    if (typeof value === "object" && !Array.isArray(value)) {
      res[otherKey] = prepareInputForMutation(value);
      return;
    }
    if (Array.isArray(value)) {
      value = value.map(v => prepareInputForMutation(v));
    }
    res[otherKey] = value;
  });

  return res;
}

export default prepareInputForMutation;
