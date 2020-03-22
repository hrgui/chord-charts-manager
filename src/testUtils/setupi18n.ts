import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const translation = require("../../public/locales/en-US/translation.json");
const setlist = require("../../public/locales/en-US/setlist.json");
const song = require("../../public/locales/en-US/song.json");

i18n.use(initReactI18next).init({
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation,
      setlist,
      song
    }
  }
});
