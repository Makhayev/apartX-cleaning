import { initReactI18next } from "react-i18next";

import i18n from "i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "ru",
  resources: {
    ru: {
      translation: {
        indexPage: {
          home: "Главная",
        },
        loginPage: {
          logIn: "Войти",
        },
        languagePopover: {
          currentLanguage: "Русский",
        },
      },
    },
    en: {
      translation: {
        indexPage: {
          home: "Home",
        },
        loginPage: {
          logIn: "Log in",
        },

        languagePopover: {
          currentLanguage: "English",
        },
      },
    },
    kz: {
      translation: {
        indexPage: {
          home: "Бас парақша",
        },
        loginPage: {
          logIn: "Кіру",
        },

        languagePopover: {
          currentLanguage: "Қазақша",
        },
      },
    },
  },
});

export default i18n;
