import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
// TODO: UNCOMMENT when we actually do have other languages needed to be supported
// import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // TODO: UNCOMMENT when we actually do have other languages needed to be supported
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: "en-US",
    fallbackLng: "en-US",
    // TODO: change this to process.env.NODE_ENV === development when we finalize MVP
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    preload: ["en-US"],
    load: "currentOnly",
    ns: ["song", "setlist"],
  });

export default i18n;
