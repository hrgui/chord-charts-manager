if (process.env.NODE_ENV === "development" && (window as any).Cypress) {
  console.log("fetch", window.fetch);
  require("whatwg-fetch");
  console.log("fetch after", window.fetch);
}

export default true;
