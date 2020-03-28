export function getOrCreateElement(query) {
  let el = document.querySelector(query);

  if (!el) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Temp el created for " +
          query +
          " but not mounted - ensure the element exists in production code"
      );
    }
    el = document.createElement("div");
  }

  return el;
}
