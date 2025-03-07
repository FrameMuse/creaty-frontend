import i18next from "i18next"
import { I18N_EDITOR_REFRESH_EVENT } from "react-i18n-editor"
import { initReactI18next } from "react-i18next"

import localeResources, { LocaleKeys } from "./locales"
import initReactMarkdownPostProcess from "./react-markdown-postprocess"

export const localeLocalStorage = localStorage.getItem("lang") as LocaleKeys | null
export const localeNavigator = window.navigator.language.split("-")[0] as LocaleKeys
export const localeFallback: LocaleKeys = "en"
export const localeCurrent: LocaleKeys = localeLocalStorage || localeNavigator || localeFallback

i18next.use(initReactMarkdownPostProcess).use(initReactI18next).init({
  lng: localeCurrent,
  fallbackLng: localeFallback,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  postProcess: ["reactMarkdownPostProcess"],
  returnObjects: true,
  react: {
    bindI18n: I18N_EDITOR_REFRESH_EVENT,
    bindI18nStore: I18N_EDITOR_REFRESH_EVENT,
  },
  // editor: {
  //   enabled: true,
  //   autoOpen: true, // if set to false you will need to open it via API

  //   // enable by adding querystring locize=true; can be set to another value or turned off by setting to false
  //   enableByQS: "locize",

  //   // turn on/off by pressing
  //   toggleKeyModifier: "ctrlKey", // metaKey | altKey | shiftKey
  //   toggleKeyCode: 24, // x when pressing ctrl (e.which: document.addEventListener('keypress', (e) => console.warn(e.which, e));

  //   // use lng in editor taken from query string, eg. if running with lng=cimode (i18next, locize)
  //   lngOverrideQS: "useLng",

  //   // use lng in editor, eg. if running with lng=cimode (i18next, locize)
  //   lngOverride: null,

  //   // default will open a iframe; setting to window will open a new window/tab instead
  //   mode: "iframe", // 'window',

  //   // styles to adapt layout in iframe mode to your website layout
  //   iframeContainerStyle: "z-index: 1000; position: fixed; top: 0; right: 0; bottom: 0; width: 600px; box-shadow: -3px 0 5px 0 rgba(0,0,0,0.5);",
  //   iframeStyle: "height: 100%; width: 600px; border: none;",
  //   bodyStyle: "margin-right: 605px;",

  //   // handle when locize saved the edited translations, eg. reload website
  //   // You may need to click first one of the text elements in your app first. (https://github.com/locize/locize-editor/issues/17)
  //   onEditorSaved: function (lng, ns) { location.reload() },
  // },
  resources: localeResources
})

