if (import.meta.env.DEV && (window as any).Cypress) {
  require("whatwg-fetch");
}

export default true;
