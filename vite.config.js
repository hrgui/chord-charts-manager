const reactRefreshPlugin = require("@vitejs/plugin-react-refresh").default;
const viteTsConfigPathsPlugin = require("vite-tsconfig-paths").default;
const macrosPlugin = require("vite-plugin-babel-macros").default;
const xmlhttprequest = require("xmlhttprequest");

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  plugins: [reactRefreshPlugin(), viteTsConfigPathsPlugin(), macrosPlugin()],
};

module.exports = config;
