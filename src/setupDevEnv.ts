if (process.env.NODE_ENV === "development" && (window as any).Cypress) {
  require("whatwg-fetch");
}

export default true;
