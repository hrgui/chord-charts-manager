const reactRefreshPlugin = require("@vitejs/plugin-react-refresh").default;
const viteTsConfigPathsPlugin = require("vite-tsconfig-paths").default;
const macrosPlugin = require("vite-plugin-babel-macros").default;
const xmlhttprequest = require("xmlhttprequest");
const { defineConfig, loadEnv } = require("vite");

/**
 * @type {import('vite').UserConfig}
 */
const config = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce((prev, [key, val]) => {
    return {
      ...prev,
      ["process.env." + key]: `"${val}"`,
    };
  }, {});
  console.log(`mode=${mode} command=${command}`);

  return {
    plugins: [reactRefreshPlugin(), viteTsConfigPathsPlugin(), macrosPlugin()],
    define: {
      ...envWithProcessPrefix,
      "process.env.DEV": mode === "development",
      "process.env.PROD": mode === "production",
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || mode),
    },
  };
});
module.exports = config;
